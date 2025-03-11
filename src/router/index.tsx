import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import { RouteObject } from "react-router-dom";
import menuRoutes from "./menu";

export type Route = RouteObject & {
  path: string;
  name?: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  children?: Route[];
  component?: React.ReactNode;
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
    children: [...menuRoutes],
  },
];

export default routes;
