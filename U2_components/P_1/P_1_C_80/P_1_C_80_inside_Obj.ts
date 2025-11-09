// Based on B-280: RENDER the list of matched Kotlin files

// (fileName, path, score, type)

export interface MatchedFile {

  fileName: string;

  path: string;

  score: number;

  type: string;

  [key: string]: any;

}



export interface IProps {

  // propName: items

  // propType: Array

  // isRequired: true

  items: MatchedFile[];

}