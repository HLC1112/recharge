export interface IProps {

  /**

   * 控制提取进度区的显示和隐藏。

   * @default false

   */

  visible?: boolean;

  /**

   * 传递给内部进度条 (P_1_C_77) 的百分比 (0-100)。

   * @default 0

   */

  progress?: number;

  /**

   * The HTML tag to use for the container.

   * Based on CL_18 (Container).

   * @default 'div'

   */

  tag?: string;

}