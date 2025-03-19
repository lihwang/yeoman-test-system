import { useRoutes } from "react-router-dom";
import routes from "./router";
import { App as AntdAppp } from "antd";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token: string | null = sessionStorage.getItem("token") || null;
    const isWhite = ["/sgks_teacher/login"].includes(location.pathname);
    if (!token) {
      if (isWhite) return;
      location.replace("/sgks_teacher/login");
    } else {
      if (isWhite) {
        location.replace("/sgks_teacher");
      }
    }
  }, []);
  const RouterPage = useRoutes(routes);
  return <AntdAppp className="h-[100vh]">{RouterPage}</AntdAppp>;
}

export default App;
