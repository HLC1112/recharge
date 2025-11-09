// 此处可做简单的内容预处理；当前父层 orchestrator 负责解析。
export function normalizeMermaidText(s: string) {
  // 去除 UTF-8 BOM 等潜在问题
  if (s && s.charCodeAt(0) === 0xFEFF) return s.slice(1)
  return s
}
