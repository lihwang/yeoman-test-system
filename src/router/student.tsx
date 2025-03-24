import { TeamOutlined } from "@ant-design/icons";
import { Route } from ".";
import StudentClass from "@/pages/student/class";
import StudentList from "@/pages/student/list";
import TestRecord from "@/pages/student/list/TestRecord";

const menuRoutes: Route[] = [
  {
    path: "student",
    name: "学员管理",
    icon: <TeamOutlined />,
    children: [
      {
        path: "class",
        name: "班级列表",
        element: <StudentClass />,
      },
      {
        path: "list",
        name: "学员列表",
        element: <StudentList />,
      },
      {
        path: "record/:studentId",
        name: "考试记录",
        element: <TestRecord />,
        hidden: true,
      },
    ],
  },
];

export default menuRoutes;
