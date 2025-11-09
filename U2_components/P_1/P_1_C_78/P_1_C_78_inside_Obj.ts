// This interface defines the structure for file results passed from the parent

// and down to the child component P_1_C_80.

export interface MatchedFile {

  fileName: string;

  path: string;

  score: number;

  type: string;

  [key: string]: any;

}



export interface IProps {

  // propName: visible

  // description: 控制提取结果区的显示和隐藏。

  visible?: boolean;



  // propName: results

  // description: 要传递给内部文件列表 (P_1_C_80) 的结果数组。

  results: MatchedFile[];

}