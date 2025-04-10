import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";
import user from "./user";
import topic from "./topic";
import paper from "./paper";
import student from "./student";
import EditPassword from "@/pages/system/TeacherManage/EditPassword";
import { CreditCardOutlined } from "@ant-design/icons";
import recommend from "./recommend";
export type Route = RouteObject & {
  path: string;
  name?: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  children?: Route[];
  component?: React.ReactNode;
  hidden?: boolean;
};

export const menuRoutes = [
  ...user,
  ...topic,
  ...student,
  ...paper,
  ...recommend,
  {
    path: "editPass",
    name: "修改密码",
    icon: <CreditCardOutlined />,
    element: <EditPassword />,
  },
];

const routes: Route[] = [
  {
    path: "/login",
    name: "登录",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [...menuRoutes],
  },
];

export default routes;
