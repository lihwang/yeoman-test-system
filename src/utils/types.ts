export type ObjectiveItem = {
  questionId: number;
  /** 题目编号 */
  questionCode: string;
  /** 题目类型 */
  questionType: string;
  /** 课程id */
  courseId: string;
  /** 课程名称 */
  courseName: string;
  questionStem: string;
  labels: {
    labelId: number;
    labelName: string;
  }[];
  createTime: string;
  updateTime: string;
};

export type OperationItem = {
  exerciseId: string;
  /** 操作题类型 */
  exerciseType: string;
  /** 操作题编码 */
  exerciseCode: string;
  /** 题干 */
  exerciseStem: string;
  /** 知识点标签集合 */
  labels: {
    labelId: number;
    labelName: string;
  }[];
  createTime: string;
  updateTime: string;
};
