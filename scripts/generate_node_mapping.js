const fs = require('fs');
const path = require('path');

// 读取映射表文件
const mappingPath = 'e:/映射表.txt';
const content = fs.readFileSync(mappingPath, 'utf-8');

// 解析TSV格式的数据
const lines = content.split('\n').filter(line => line.trim());
const headers = lines[0].split('\t');

// 找到各列的索引
const nodeIdIdx = headers.indexOf('节点 ID');
const displayTextIdx = headers.indexOf('显示文本/内容');
const styleClassIdx = headers.indexOf('样式类');
const styleSummaryIdx = headers.indexOf('样式属性摘要');
const componentIdIdx = headers.indexOf('组件ID');
const parentComponentIdIdx = headers.indexOf('父容器组件ID');

const nodeMapping = {};

// 解析每一行数据
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  
  const cols = line.split('\t');
  const nodeId = cols[nodeIdIdx]?.trim();
  
  if (!nodeId) continue;
  
  const displayText = cols[displayTextIdx]?.trim() || '';
  const styleClass = cols[styleClassIdx]?.trim() || '';
  const styleSummary = cols[styleSummaryIdx]?.trim() || '';
  const componentId = cols[componentIdIdx]?.trim() || '';
  const parentComponentId = cols[parentComponentIdIdx]?.trim() || '';
  
  nodeMapping[nodeId] = {
    nodeId,
    displayText,
    styleClass,
    styleSummary,
    componentId,
    parentComponentId,
  };
}

// 输出JSON文件
const outputPath = path.join(__dirname, '../U8_config/nodeMapping.json');
fs.writeFileSync(outputPath, JSON.stringify(nodeMapping, null, 2), 'utf-8');

console.log(`已生成节点映射文件: ${outputPath}`);
console.log(`共解析 ${Object.keys(nodeMapping).length} 个节点映射`);

