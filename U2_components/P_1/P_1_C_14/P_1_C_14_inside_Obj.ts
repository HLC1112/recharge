export interface IProps {
  /** 控制弹窗显隐（v-model:visible） */
  visible: boolean
  /** 弹窗标题（可选） */
  title?: string
  /** 允许的文件类型（默认 .mmd/.mermaid/.md/.txt） */
  accept?: string
  /** 覆盖层 z-index（可选） */
  overlayZ?: number
}
