/**

 * 组件的属性接口定义。

 * P_1_C_77 进度条组件

 */

export interface IProps {

  /**

   * 进度条的当前百分比 (0-100)。

   * @TSRef control/propName: progress

   * @TSRef control/propType: Number

   * @TSRef control/isRequired: true

   * @TSRef control/defaultValue: '0'

   */

  progress: number;

}