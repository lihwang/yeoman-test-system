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

export type { TeacherType };
