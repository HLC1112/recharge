/**
 * =============================================================================
 * 剧情配置生成脚本 (最终整合版)
 * =============================================================================
 *
 * 功能:
 * 1. 读取 A01_Story_lines 中的所有台词.xlsx文件。
 * 2. 读取 A06_Configuration_table 中的所有配置.xlsx文件。
 * 3. 修正列名差异 ('台词序号' vs '台词编号')。
 * 4. 整合所有数据，并为剧情行自动生成 EventType。
 * 5. 输出 U8_config/character_config.json 和 U8_config/story_data.json。
 *
 * 运行:
 * node scripts/convert_excel_to_json.js
 *
 * =============================================================================
 */
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// --- 1. 路径定义 ---
const CONFIG_TABLE_PATH = path.join(__dirname, '..', 'static', 'A06_Configuration_table');
const LINES_PATH = path.join(__dirname, '..', 'static', 'A01_Story_lines');
const OUTPUT_PATH = path.join(__dirname, '..', 'U8_config');

// --- 2. 辅助函数 ---
function readXlsxFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`文件不存在: ${filePath}`);
        }
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        return xlsx.utils.sheet_to_json(sheet);
    } catch (error) {
        console.error(`❌ 读取 XLSX 文件失败: ${filePath}`, error);
        throw error;
    }
}

// --- 3. JSON 生成函数 ---

function generateCharacterConfig() {
    console.log('⚙️  正在生成 character_config.json...');
    const filePath = path.join(CONFIG_TABLE_PATH, 'Role_binding_component.xlsx');
    const rolesData = readXlsxFile(filePath);
    const characterConfig = {};

    rolesData.forEach(row => {
        const roleId = row['角色编号'];
        if (!roleId || String(roleId).trim() === '') return;
        characterConfig[String(roleId)] = {
            name: row['角色姓名'],
            type: row['角色定位'],
            components: {
                container: row['容器前端组件编号'],
                nameDisplay: row['姓名前端组件编号'],
                dialogueBubble: row['台词内容前端组件编号'],
                emotionImage: row['表情图片前端组件编号'],
                dialogueButton: row['台词按钮前端组件编号'],
            }
        };
    });
    characterConfig['narrator'] = { name: '旁白', type: 'narrator', components: { dialogueBubble: 'P_3_C_12' }};
    const outputPath = path.join(OUTPUT_PATH, 'character_config.json');
    fs.writeFileSync(outputPath, JSON.stringify(characterConfig, null, 2));
    console.log(`✅ character_config.json 已成功生成。`);
}

function generateStoryData() {
    console.log('⚙️  正在生成 story_data.json...');

    // a. 加载所有数据源
    const beatsData = readXlsxFile(path.join(CONFIG_TABLE_PATH, 'Beats_binding_data.xlsx'));
    const linsData = readXlsxFile(path.join(CONFIG_TABLE_PATH, 'Lins_binding_data.xlsx'));
    const optionsData = readXlsxFile(path.join(CONFIG_TABLE_PATH, 'Option_binding_data.xlsx'));
    const plotQuestionsData = readXlsxFile(path.join(CONFIG_TABLE_PATH, 'Plot_question.xlsx'));
    const allLines = [];
    const lineFiles = fs.readdirSync(LINES_PATH).filter(f => f.endsWith('.xlsx') && !f.startsWith('~'));
    console.log(`🔍 找到 ${lineFiles.length} 个台词文件: ${lineFiles.join(', ')}`);
    for (const file of lineFiles) {
        const lines = readXlsxFile(path.join(LINES_PATH, file));
        allLines.push(...lines);
    }
    allLines.sort((a, b) => String(a['台词序号'] || '').localeCompare(String(b['台词序号'] || '')));

    // b. 数据预处理
    const linsMap = new Map(linsData.map(item => [String(item['台词编号']), item]));
    const plotQuestionMap = new Map(plotQuestionsData.map(item => [String(item['节拍序号(Beat No.)']), item]));
    
    // c. 预处理选项数据
    const optionTriggers = {};
    optionsData.forEach(item => {
        const triggerId = String(item['台词编号']);
        if (triggerId && item['前端问题组件编号']) {
            optionTriggers[triggerId] = {
                lineId: triggerId,
                EventType: (item['前端问题组件编号'] && String(item['前端问题组件编号']).trim() !== '/') ? 'D1_4_BranchingNode' : 'D1_2_PlayerChoice',
                text: '', options: []
            };
        }
    });
    optionsData.forEach(item => {
        const optionLineId = String(item['台词编号']);
        if (optionLineId && item['前端选项组件编号']) {
            const triggerId = Object.keys(optionTriggers).find(id => optionLineId.startsWith(id.substring(0, 9)));
            if (triggerId && optionTriggers[triggerId]) {
                optionTriggers[triggerId].options.push({
                    lineId: optionLineId, jumpsTo: item['触发跳转至分镜'], text: ''
                });
            }
        }
    });
    
    // d. 核心处理
    const story = {};
    const processedOptionLines = new Set();

    Object.values(optionTriggers).forEach(trigger => {
        const triggerLineData = allLines.find(line => String(line['台词序号']) === trigger.lineId);
        if (triggerLineData) trigger.text = triggerLineData['台词内容'];
        trigger.options.forEach(opt => {
            const optionLineData = allLines.find(line => String(line['台词序号']) === opt.lineId);
            if (optionLineData) opt.text = optionLineData['台词内容'];
            processedOptionLines.add(opt.lineId);
        });
        story[trigger.lineId] = trigger;
        processedOptionLines.add(trigger.lineId);
    });

    for (const line of allLines) {
        const lineId = String(line['台词序号']);
        if (!lineId || lineId === 'undefined' || processedOptionLines.has(lineId)) continue;
        
        const linsInfo = linsMap.get(lineId) || {};
        let finalEmotionImagePath = null;
        let finalEmotionSoundPath = null;

        const imageId = linsInfo['表情图片编号'];
        if (imageId && typeof imageId === 'string' && imageId.trim() !== '/') {
            const parts = imageId.split('_');
            if (parts.length >= 3) {
                const charId = parts[1];
                const emoId = parts[2];
                finalEmotionImagePath = `static/A05_Emoji_images/${charId}/${charId}_${emoId}.png`;
            }
        }

        const soundId = linsInfo['表情音效编号'];
        if (soundId && typeof soundId === 'string' && soundId.trim() !== '/') {
            const parts = soundId.split('_');
            if (parts.length >= 3) {
                const charId = parts[1];
                const soundCode = parts[2];
                finalEmotionSoundPath = `static/A07_Emoji_sounds/${charId}/${charId}_${soundCode}.mp3`;
            }
        }

        const cue = {
            lineId: lineId,
            EventType: '',
            characterId: String(line['角色编号']),
            text: line['台词内容'],
            shotImage: `static/A04_Story_images/${lineId.substring(0, 9)}00.png`,
            shotSound: `static/A03_Sound/${lineId.substring(0, 9)}00.mp3`,
            emotionImage: finalEmotionImagePath,
            emotionSound: finalEmotionSoundPath,
            next: null
        };

        if (plotQuestionMap.has(lineId)) {
            cue.EventType = 'D1_6_PlotQuestion';
            const questionData = plotQuestionMap.get(lineId);
            cue.questionText = questionData['问题(下一章节梗概)'];
            cue.options = [
                { id: 'A', text: questionData['选项A(玩家态度)'] },
                { id: 'B', text: questionData['选项B(玩家态度)'] }
            ];
        } else {
            cue.EventType = 'D1_1_PlayDialogue';
        }
        story[lineId] = cue;
    }

    // e. 链接 "next" 字段
    const allLineIdsInOrder = allLines.map(l => String(l['台词序号'])).filter(Boolean);
    for (let i = 0; i < allLineIdsInOrder.length - 1; i++) {
        const currentId = allLineIdsInOrder[i];
        const nextId = allLineIdsInOrder[i + 1];
        if (story[currentId] && story[currentId].EventType === 'D1_1_PlayDialogue') {
            story[currentId].next = nextId;
        }
    }
    
    // f. 处理章节信息
    const chapters = beatsData.map(row => {
        const beatId = String(row['节拍编号']);
        const chapterName = row['章节名称'] || '';
        const chapterId = chapterName.includes('支线') ? beatId.substring(0, 7) : beatId.substring(0, 3);
        return {
            id: chapterId,
            title: chapterName,
            componentId: row['前端组件编号'],
            backgroundMusic: `static/A02_Music/${chapterId}.mp3`
        };
    });
    
    // g. 组合并写入文件
    const storyData = { chapters, story };
    const outputPath = path.join(OUTPUT_PATH, 'story_data.json');
    fs.writeFileSync(outputPath, JSON.stringify(storyData, null, 2), 'utf-8');
    console.log(`✅ story_data.json 已成功生成。`);
}

// --- 4. 主执行函数 ---
function main() {
    try {
        console.log('--- 开始执行配置生成任务 ---');
        if (!fs.existsSync(OUTPUT_PATH)) {
            fs.mkdirSync(OUTPUT_PATH, { recursive: true });
        }
        
        generateCharacterConfig();
        generateStoryData();

        console.log('--- ✅ 所有任务已成功完成 ---');
    } catch (error) {
        console.error('\n--- ❌ 任务执行失败 ---');
        console.error(error.message);
        process.exit(1);
    }
}

// --- 5. 运行脚本 ---
main();
// To run the script from your terminal:
// node scripts/convert_excel_to_json.js