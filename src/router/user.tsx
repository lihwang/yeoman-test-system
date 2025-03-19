import { UserOutlined } from "@ant-design/icons";
import { Route } from ".";
import TeacherManage from "@/pages/system/TeacherManage";
import TeacherDetail from "@/pages/system/TeacherManage/TeacherDetail";

const user: Route[] = [
  {
    path: "user",
    name: "教师管理",
    icon: <UserOutlined />,
    children: [
      {
        path: "teacher",
        name: "用户（教师）管理",
        element: <TeacherManage />,
      },
      {
        path: "teacher/:teacherId",
        name: "用户详情",
        element: <TeacherDetail />,
        hidden: true,
      },
    ],
  },
];

export default user;
