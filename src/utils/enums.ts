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

export enum QuestionTypeEnum {
  填空题 = 1,
  选择题 = 2,
  判断题 = 3,
  问答题=4 
}

export const QuestionTypeList = Object.keys(QuestionTypeEnum).map(i=>{
  return {
    label:i,
    value:QuestionTypeEnum[i]
  }
})