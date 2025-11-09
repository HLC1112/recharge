export interface IProps {

  /**

   * 禁用选择文件夹按钮（例如，当正在扫描时）。

   * @default false

   */

  disabled?: boolean;

}



export type IEmits = {

  /**

   * 当用户成功选择了文件夹时发出，携带文件列表和路径信息。

   */

  (e: 'folder-selected', payload: { files: FileList; pathInfo: string }): void;

}