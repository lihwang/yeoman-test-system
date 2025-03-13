import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";
import user from "./user";

export type Route = RouteObject & {
  path: string;
  name?: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  children?: Route[];
  component?: React.ReactNode;
  hidden?: boolean;
};

const routes: Route[] = [
  {
    path: "/login",
    name: "登录",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [...user],
  },
];

export default routes;
