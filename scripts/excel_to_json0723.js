const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// --- 列标题定义 ---
const beatNoHeader = '节拍序号(Beat No.)';
const actNameHeader = '进入大幕名称';
const questionHeader = '问题(下一章节梗概)';
const optionAHeader = '选项A(玩家态度)';
const optionBHeader = '选项B(玩家态度)';
// --------------------

const inputFile = path.resolve(__dirname, '../static/A06_Configuration_table/Plot_question.xlsx');
const outputFile = path.resolve(__dirname, '../U8_config/plot_question.json');

try {
    const workbook = xlsx.readFile(inputFile);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const resultMap = {};
    jsonData.forEach(row => {
        const beatNo = row[beatNoHeader];
        const questionText = row[questionHeader];
        const optionAText = row[optionAHeader];

        // 判断逻辑：只要 beatNo, 问题 和 选项A 存在且不为'/'，就认为这是一条有效数据
        if (beatNo && beatNo.toString().trim() &&
            questionText && questionText.toString().trim() && questionText.toString().trim() !== '/' &&
            optionAText && optionAText.toString().trim() && optionAText.toString().trim() !== '/') 
        {
            const key = beatNo.toString().trim();
            resultMap[key] = {
                beatNo: key, // beatNo 也作为数据的一部分存进去
                actName: row[actNameHeader] || '/',
                questionText: questionText,
                options: [
                    { id: 'A', text: optionAText },
                    { id: 'B', text: row[optionBHeader] }
                ]
            };
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(resultMap, null, 2), 'utf-8');

    console.log(`✅ Successfully converted ${inputFile} to ${outputFile}. Total records: ${Object.keys(resultMap).length}`);

} catch (error) {
    console.error(`\n❌ Error processing file: ${error.message}`);
}

// node scripts/excel_to_json0723.js