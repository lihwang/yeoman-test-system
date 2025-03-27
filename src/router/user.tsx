import { UserOutlined } from "@ant-design/icons";
import { Route } from ".";
import TeacherManage from "@/pages/system/TeacherManage";

const user: Route[] = [
  {
    path: "user",
    name: "教师管理",
    icon: <UserOutlined />,
    children: [
      {
        path: "teacher",
        name: "用户管理",
        element: <TeacherManage />,
      },
    ],
  },
];

export default user;
