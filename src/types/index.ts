interface TeacherType {
  teacherId?: number;
  userName: string;
  realName: string;
  teacherPass: string;
  /** 所教课程集合 */
  courseIds: number[];
  /** 所教专业集合 */
  majorIds: number[];
  /** 所教班级集合 */
  classIds: number[];
  /**
   * 操作类型
   * 1：新增，2：编辑
   */
  opt: number;
}

interface LabelType {
  /**
   * 标签id
   */
  labelId?: number;
  /**
   * 标签名称
   */
  labelName?: string;
}

interface ObjectiveType {
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
}

interface OperationType {
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
}

interface ClassType {
  /**
   * 年级
   */
  classGrade: number;
  classid: number;
  /**
   * 队别号
   */
  classTeam: number;
  /**
   * 区队号
   */
  classUnit: number;
  /**
   * 专业id
   */
  majorid: number;
  /**
   * 专业名称
   */
  majorName: string;
}

interface StudentType {
  classGrade: number;
  classTeam: number;
  classUnit: number;
  majorId: string;
  majorName: string;
  studentId: number;
  studentName: string;
  studentNo: string;
}

interface PaperType {
  /**
   * 所属课程id
   */
  courseId: string;
  /**
   * 所属课程名称
   */
  courseName: string;
  createTime: string;
  /**
   * 操作题数量
   */
  exerciseCount: string;
  paperId: string;
  /**
   * 试卷名称
   */
  paperName: string;
  /**
   * 客观题数量
   */
  questionCount: string;
  /**
   * 总分
   */
  totalScore: string;
  updateTime: string;
}

export type {
  TeacherType,
  LabelType,
  ObjectiveType,
  OperationType,
  ClassType,
  StudentType,
  PaperType,
};
