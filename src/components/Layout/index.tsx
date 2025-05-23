import {
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import { Dropdown, message } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { menuRoutes, Route } from "@/router";
import { logout, userAtom } from "@/store/indext";
import { useAtom, useAtomValue } from "jotai";
import { enumValuesLoader } from "@/store/enum";

type MenuItem = {
  path?: string;
  name?: string;
  icon?: React.ReactNode;
  routes?: MenuItem[];
};

const loopMenuItem = (menus: Route[]): MenuItem[] =>
  menus
    .filter((i) => !i.hidden)
    .map(({ icon, path, name, children }) => ({
      path,
      name,
      icon,
      routes: children ? loopMenuItem(children) : undefined,
    }));

const initPath = "/dashboard/workbench";
const BackendLaytout = () => {
  const settings: ProSettings | undefined = {
    fixSiderbar: true,
    layout: "mix",
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const user = useAtomValue(userAtom);
  const [enumValues, loadEnumValues] = useAtom(enumValuesLoader);

  useEffect(() => {
    console.log(user.token, enumValues, "enumValues");

    if (user.token && !Object.keys(enumValues).length) {
      loadEnumValues();
    }
  }, [enumValues, loadEnumValues, user.token]);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        route={{ path: "/sgks_teacher/", routes: loopMenuItem(menuRoutes) }}
        title="计算机应用能力综合考测平台"
        siderWidth={216}
        location={{
          pathname,
        }}
        avatarProps={{
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: user.userName,
          render: (_props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                      onClick: () => {
                        message.success("退出成功");
                        logout();
                        navigate("/login");
                      },
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        pageTitleRender={false}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <InfoCircleFilled key="InfoCircleFilled" />,
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <GithubFilled key="GithubFilled" />,
          ];
        }}
        // breadcrumbProps={{}}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return (
            <div
              style={{
                textAlign: "center",
                paddingBlockStart: 12,
              }}
            >
              <div>© 2021 Made with love</div>
              <div>by Ant Design</div>
            </div>
          );
        }}
        menuItemRender={(item, dom) => {
          return (
            <Link
              onClick={() => {
                console.log(item.path);
                setPathname(item.path || initPath);
              }}
              to={item.path || initPath}
            >
              {dom}
            </Link>
          );
        }}
        {...settings}
      >
        <PageContainer>
          <ProCard
            style={{
              overflow: "auto",
            }}
          >
            <Outlet />
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default BackendLaytout;
