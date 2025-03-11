import { DashboardOutlined } from "@ant-design/icons";
import { Route } from ".";

const menuRoutes: Route[] = [
  {
    path: "dashboard",
    name: "首页",
    icon: <DashboardOutlined />,
    children: [
      {
        path: "workbench",
        name: "工作台",
        // element: <Workbench />,
      },
    ],
  },
];

export default menuRoutes;
