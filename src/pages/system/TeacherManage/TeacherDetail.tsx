import request from "@/services/interceptors";
import { ProDescriptions } from "@ant-design/pro-components";
import { useParams } from "react-router-dom";
const TeacherDetail = () => {
  const params = useParams();
  const { teacherId } = params;
  console.log(teacherId, "teacherId");
  return (
    <ProDescriptions
      title="教师信息"
      request={async () => {
        const res = await request.sgks.teacherGetList({
          teacherId: +teacherId,
        });
        return res;
      }}
      emptyText={"空"}
      columns={[
        {
          title: "教师ID",
          key: "text",
          dataIndex: "teacherId",
        },
        {
          title: "教师用户名",
          key: "text",
          dataIndex: "teacherUserName",
        },
        {
          title: "教师姓名",
          key: "text",
          dataIndex: "teacherRealName",
        },
        {
          title: "所教课程",
          key: "text",
          dataIndex: "courses",
        },
        {
          title: "所带专业",
          key: "text",
          dataIndex: "majors",
        },
        {
          title: "所带班级",
          key: "text",
          dataIndex: "classes",
        },
      ]}
    ></ProDescriptions>
  );
};

export default TeacherDetail;
