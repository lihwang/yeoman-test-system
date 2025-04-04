import { atom } from "jotai";
import request from "@/services/interceptors";

interface EnumValues {
  [key: string]: {
    value: string | number;
    label: string;
  }[];
}

const enumValuesAtom = atom<EnumValues>({});

// 分别定义不同接口的获取函数
const fetchCourseEnum = async () => {
  try {
    const res = await request.sgks.courseAllList();
    return {
      courseList: res.data?.map((i) => {
        return {
          value: i.courseId,
          label: i.courseName,
        };
      }),
    };
  } catch (error) {
    console.error("获取Course枚举值失败:", error);
    return { courseList: [] };
  }
};

const fetchMajorEnum = async () => {
  try {
    const res = await request.sgks.majorAllList();
    return {
      majorList: res.data?.map((i) => {
        return {
          value: i.majorId,
          label: i.majorName,
        };
      }),
    };
  } catch (error) {
    console.error("获取Major枚举值失败:", error);
    return { userTypes: [] };
  }
};

const fetchGradeEnum = async () => {
  try {
    const res = await request.sgks.gradeListList();
    return {
      gradeList: res.data?.map((i) => {
        return {
          value: i,
          label: i,
        };
      }),
    };
  } catch (error) {
    console.error("获取Major枚举值失败:", error);
    return { userTypes: [] };
  }
};

const fetchLabelEnum = async () => {
  try {
    const res = await request.sgks.labelListList();
    return {
      labelList: res.data
        ?.filter((j) => j.labelStatus === 1)
        ?.map((i) => {
          return {
            value: i.labelId,
            label: i.labelName,
          };
        }),
    };
  } catch (error) {
    console.error("获取Major枚举值失败:", error);
    return { userTypes: [] };
  }
};

// 统一获取所有枚举值
const fetchEnumValues = async () => {
  try {
    const [courseData, majorData, gradeList, labelList] = await Promise.all([
      fetchCourseEnum(),
      fetchMajorEnum(),
      fetchGradeEnum(),
      fetchLabelEnum(),
    ]);

    return {
      ...courseData,
      ...majorData,
      ...gradeList,
      ...labelList,
    };
  } catch (error) {
    console.error("获取枚举值失败:", error);
    return {};
  }
};

const enumValuesLoader = atom(
  (get) => get(enumValuesAtom),
  async (get, set) => {
    const data = await fetchEnumValues();
    set(enumValuesAtom, data);
  }
);

export { enumValuesAtom, enumValuesLoader };
