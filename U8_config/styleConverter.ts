// 样式属性摘要转CSS的工具函数

/**
 * 将样式属性摘要字符串转换为CSS样式对象
 * @param styleSummary 样式属性摘要，例如: "shape:rectangle,fill:#fff,stroke:#ff6600,color:#ff6600,stroke-width:2px"
 * @returns CSS样式对象
 */
export function parseStyleSummary(styleSummary: string): Record<string, string> {
  if (!styleSummary || styleSummary.trim() === '' || styleSummary === '(使用默认样式)') {
    return {};
  }

  const css: Record<string, string> = {};
  
  // 处理中文描述，例如: "形状: parallelogram，填充: #f5f5f5，边框: #555"
  // 先替换中文逗号为英文逗号
  const normalized = styleSummary.replace(/，/g, ',').replace(/\s+/g, ' ').trim();
  const parts = normalized.split(',').map(s => s.trim()).filter(s => s);

  let rx = '';
  let ry = '';

  for (const part of parts) {
    if (!part.includes('：') && !part.includes(':')) continue;
    
    const colonIndex = part.indexOf(':') !== -1 ? part.indexOf(':') : part.indexOf('：');
    const key = part.substring(0, colonIndex).trim();
    const value = part.substring(colonIndex + 1).trim();

    // 映射中文键名到CSS属性
    const keyMap: Record<string, string> = {
      '形状': 'shape',
      'shape': 'shape',
      '填充': 'fill',
      'fill': 'fill',
      '背景': 'fill',
      'background': 'fill',
      '边框': 'stroke',
      'stroke': 'stroke',
      '颜色': 'color',
      'color': 'color',
      '文字颜色': 'color',
      'stroke-width': 'stroke-width',
      '边框宽度': 'stroke-width',
      'stroke-dasharray': 'stroke-dasharray',
      '虚线': 'stroke-dasharray',
      'rx': 'rx',
      'ry': 'ry',
    };

    const cssKey = keyMap[key.toLowerCase()] || key.toLowerCase().replace(/\s+/g, '-');

    // 处理特殊值
    if (cssKey === 'shape') {
      // shape属性在CSS中需要特殊处理
      if (value === 'cylinder') {
        css['border-radius'] = '50% 50% 0 0 / 100% 100% 0 0';
      } else if (value === 'diamond') {
        css['clip-path'] = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      } else if (value === 'parallelogram') {
        css['clip-path'] = 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)';
      } else if (value === 'rectangle') {
        // 矩形是默认形状，不需要特殊处理
      }
    } else if (cssKey === 'fill' || cssKey === 'background') {
      css['background-color'] = value;
    } else if (cssKey === 'stroke') {
      css['border-color'] = value;
      css['border-style'] = 'solid';
    } else if (cssKey === 'stroke-width' || cssKey === '边框宽度') {
      css['border-width'] = value.includes('px') ? value : `${value}px`;
    } else if (cssKey === 'color') {
      css['color'] = value;
    } else if (cssKey === 'stroke-dasharray' || cssKey === '虚线') {
      css['border-style'] = 'dashed';
      // 解析虚线模式，例如 "5 4" -> "5px 4px"
      const dashParts = value.split(/\s+/);
      if (dashParts.length >= 2) {
        css['border-width'] = dashParts[0] + (dashParts[0].includes('px') ? '' : 'px');
      }
    } else if (cssKey === 'rx') {
      rx = value;
    } else if (cssKey === 'ry') {
      ry = value;
    } else {
      css[cssKey] = value;
    }
  }

  // 合并rx和ry为border-radius
  if (rx || ry) {
    const rxValue = rx.includes('px') ? rx : (rx ? `${rx}px` : '0px');
    const ryValue = ry.includes('px') ? ry : (ry ? `${ry}px` : '0px');
    css['border-radius'] = `${rxValue} ${ryValue}`;
  }

  return css;
}

/**
 * 将CSS样式对象转换为内联样式字符串
 * @param css CSS样式对象
 * @returns 内联样式字符串（用于Vue的:style绑定）
 */
export function cssToInlineStyle(css: Record<string, string>): string {
  return Object.entries(css)
    .map(([key, value]) => {
      // Vue的内联样式可以使用kebab-case（带引号）或camelCase
      // 为了兼容性，我们使用kebab-case（带引号）
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabKey}: ${value}`;
    })
    .join('; ');
}

/**
 * 将样式属性摘要直接转换为内联样式字符串
 * @param styleSummary 样式属性摘要
 * @returns 内联样式字符串
 */
export function styleSummaryToInlineStyle(styleSummary: string): string {
  const css = parseStyleSummary(styleSummary);
  return cssToInlineStyle(css);
}

