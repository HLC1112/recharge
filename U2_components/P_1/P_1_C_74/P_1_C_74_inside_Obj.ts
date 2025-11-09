export interface IProps {

  /**

   * 显示所选文件夹路径和文件数量的文本。

   * @default '未选择文件夹'

   */

  pathInfo?: string;



  /**

   * The HTML tag to use for the text element.

   * Based on YAML style 'span#...'

   * @default 'span'

   */

  tag?: string;



  /**

   * Text style type.

   */

  type?: 'primary' | 'success' | 'warning' | 'danger';



  /**

   * Text size.

   */

  size?: 'large' | 'default' | 'small';



  /**

   * Whether to truncate the text with an ellipsis.

   */

  truncated?: boolean;



  /**

   * Max lines to show when truncated.

   */

  lineClamp?: string | number;

}