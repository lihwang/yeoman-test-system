import { ContainerOutlined, UserOutlined } from "@ant-design/icons";
import { Route } from ".";
import TeacherManage from "@/pages/system/TeacherManage";
import TeacherDetail from "@/pages/system/TeacherManage/TeacherDetail";

const menuRoutes: Route[] = [
  {
    path: "topic",
    name: "题库管理",
    icon: <ContainerOutlined />,
    children: [
      {
        path: "labels",
        name: "标签库",
        element: <TeacherManage />,
      },
      {
        path: "teacher/:teacherId",
        name: "客观题",
        element: <TeacherDetail />,
        hidden: true,
      },
      {
        path: "teacher/:teacherId",
        name: "操作题",
        element: <TeacherDetail />,
        hidden: true,
      },
    ],
  },
];

export default menuRoutes;
