import request from "@/services/interceptors";
import { useAsyncEffect } from "ahooks";
import { useMemo, useState } from "react";

/**  获取课程列表 */
export const useGetCourseList = () => {
  const [courseList, setCourseList] = useState([]);
  useAsyncEffect(async () => {
    const res = await request.sgks.courseAllList();
    setCourseList(
      res.data?.map((i) => {
        return {
          label: i.courseName,
          value: i.courseId,
        };
      })
    );
  }, []);

  const courseOptions = useMemo(() => {
    return courseList.reduce((pre, cur) => {
      return {
        ...pre,
        [cur.value]: cur.label,
      };
    }, {});
  }, [courseList]);

  return [courseList, courseOptions];
};
