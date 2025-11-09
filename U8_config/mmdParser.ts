// MMD文件解析器，支持节点定义解析和规则匹配

import nodeMappingData from './nodeMapping.json';
import { styleSummaryToInlineStyle } from './styleConverter';

const nodeMapping = nodeMappingData as Record<string, NodeMappingRule>;

export interface NodeMappingRule {
  nodeId: string;
  displayText: string;
  styleClass: string;
  styleSummary: string;
  componentId: string;
  parentComponentId: string;
}

export interface ParsedNode {
  id: string;
  label: string;
  type: string;
  styleClass?: string;
  cssStyle?: string;
  componentId?: string;
  parentComponentId?: string;
  rule?: NodeMappingRule;
}

/**
 * 解析mmd文件中的节点定义行
 * 参考源代码逻辑，支持多种节点格式
 */
export function parseMmdNodeDefinition(line: string): ParsedNode | null {
  const trimmed = line.trim();
  
  // 跳过注释、空行和各种声明行（参考源代码）
  if (!trimmed || 
      trimmed.startsWith('%') || 
      trimmed.startsWith('subgraph') || 
      trimmed.startsWith('end') || 
      trimmed.startsWith('direction') || 
      trimmed.startsWith('classDef') ||
      trimmed.startsWith('graph') ||
      trimmed.startsWith('flowchart') ||
      trimmed.startsWith('sequenceDiagram') ||
      trimmed.startsWith('style') ||
      trimmed.startsWith('linkStyle') ||
      trimmed.startsWith('%%{')) {
    return null;
  }

  // 参考源代码的节点匹配模式
  const nodePatterns = [
    /^\s*([A-Za-z0-9_]+)\s*\["([^"]+)"\]\s*(?:::([A-Za-z0-9_]+))?/,  // A["Text"]:::class
    /^\s*([A-Za-z0-9_]+)\s*\[([^\]]+)\]\s*(?:::([A-Za-z0-9_]+))?/,  // A[Text]:::class
    /^\s*([A-Za-z0-9_]+)\s*\(\(([^\)]+)\)\)\s*(?:::([A-Za-z0-9_]+))?/, // A((Text)):::class
    /^\s*([A-Za-z0-9_]+)\s*\(([^\)]+)\)\s*(?:::([A-Za-z0-9_]+))?/,  // A(Text):::class
    /^\s*([A-Za-z0-9_]+)\s*\{([^\}]+)\}\s*(?:::([A-Za-z0-9_]+))?/,  // A{Text}:::class
  ];
  
  let match = null;
  let nodeId = '';
  let label = '';
  let styleClass = '';
  
  for (const pattern of nodePatterns) {
    match = trimmed.match(pattern);
    if (match) {
      nodeId = match[1];
      label = match[2] || nodeId;
      styleClass = match[3] || '';
      break;
    }
  }
  
  if (!match || !nodeId) return null;

  // 处理<br>标签
  label = label.replace(/<br>/g, '\n');

  // 从映射表中查找匹配的节点
  const rule = nodeMapping[nodeId];
  
  // 使用映射表中的显示文本，如果没有则使用解析出的label
  const displayText = rule?.displayText || label;
  
  // 所有节点都使用默认样式（忽略映射表中的样式）
  // 只应用圆角边框等默认样式
  let cssStyle = styleSummaryToInlineStyle('');
  
  // 确保 cssStyle 不为空
  if (!cssStyle || cssStyle.trim() === '') {
    cssStyle = 'border-radius: 8px';
  }

  return {
    id: nodeId, // 保持原始ID（大写）
    label: displayText,
    type: styleClass || rule?.styleClass || 'default',
    styleClass: styleClass || rule?.styleClass,
    cssStyle,
    componentId: rule?.componentId,
    parentComponentId: rule?.parentComponentId,
    rule,
  };
}

/**
 * 解析mmd文件中的所有节点定义
 * 参考源代码逻辑，逐行解析
 */
export function parseMmdNodes(mmdContent: string): ParsedNode[] {
  const lines = mmdContent.split('\n');
  const nodes: ParsedNode[] = [];
  let parsedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const node = parseMmdNodeDefinition(line);
    if (node) {
      nodes.push(node);
      parsedCount++;
      if (parsedCount <= 5) {
        console.log(`[mmdParser] 解析节点 ${i + 1}: ${node.id} -> ${node.label.substring(0, 20)}...`);
      }
    } else if (line.trim() && 
               !line.trim().startsWith('%') && 
               !line.trim().startsWith('subgraph') && 
               !line.trim().startsWith('end') && 
               !line.trim().startsWith('direction') &&
               !line.trim().includes('->')) {
      // 记录可能被跳过的行（用于调试）
      skippedCount++;
      if (skippedCount <= 5 && (line.includes('[') || line.includes('(') || line.includes('{'))) {
        console.log(`[mmdParser] 跳过行 ${i + 1}: ${line.substring(0, 60)}...`);
      }
    }
  }

  console.log(`[mmdParser] 解析完成: ${parsedCount} 个节点, 跳过 ${skippedCount} 行`);
  return nodes;
}

/**
 * 根据节点ID获取映射规则
 */
export function getNodeMappingRule(nodeId: string): NodeMappingRule | null {
  return nodeMapping[nodeId] || null;
}

/**
 * 根据父组件ID分组节点
 */
export function groupNodesByParentComponent(nodes: ParsedNode[]): Record<string, ParsedNode[]> {
  const grouped: Record<string, ParsedNode[]> = {};

  for (const node of nodes) {
    const parentId = node.parentComponentId || 'default';
    if (!grouped[parentId]) {
      grouped[parentId] = [];
    }
    grouped[parentId].push(node);
  }

  return grouped;
}

