export interface IProps {
  // The 'd' attribute for the SVG path, defining its geometry
  d?: string;
  // Controls highlight state
  isHighlighted?: boolean;
  // Controls failure state
  isFailure?: boolean;
  // [FIX] 添加 class 属性
  class?: string;
}