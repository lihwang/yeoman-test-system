import { UserOutlined } from "@ant-design/icons";
import { Route } from ".";
import TeacherManage from "@/pages/system/TeacherManage";

const menuRoutes: Route[] = [
  {
    path: "user",
    name: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        path: "teacher",
        name: "用户（教师）管理",
        element: <TeacherManage />,
      },
    ],
  },
];

export default menuRoutes;
