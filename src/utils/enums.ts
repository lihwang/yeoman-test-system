export const courseList = [
  {
    label: "计算机应用基础",
    value: "",
  },
  {
    label: "计算网络技术",
    value: "",
  },
  {
    label: "数据库基础与技术",
    value: "",
  },
].map((i) => (i.value = i.label));

export const enumToSelectOptions = <T extends Record<string, string | number>>(
  enumObj: T
): { label: string; value: T[keyof T] }[] => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // 过滤掉数字键（针对数字枚举反向映射）
    .map((key) => ({
      label: key,
      value: enumObj[key] as T[keyof T],
    }));
};

export const enumToObject = <T extends Record<string, string | number>>(
  enumObj: T
): { [K in keyof T as K extends string ? K : never]: T[K] } => {
  return Object.keys(enumObj)
    .filter((key) => isNaN(Number(key))) // 过滤数字键（反向映射）
    .reduce((obj, key) => {
      obj[enumObj[key]] = key;
      return obj;
    }, {} as any);
};

export enum QuestionTypeEnum {
  填空题 = 1,
  选择题 = 2,
  判断题 = 3,
  问答题 = 4,
}

export enum ExerciseTypeEnum {
  基本操作 = 1,
  文字处理 = 2,
  电子表格 = 3,
  演示文稿 = 4,
}

export enum TopicType {
  Objective = "1",
  Operation = "2",
}
