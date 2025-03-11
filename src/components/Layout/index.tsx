import {
	GithubFilled,
	InfoCircleFilled,
	LogoutOutlined,
	QuestionCircleFilled
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { useState } from 'react';
import menuRoutes from '@/router/menu';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Route } from '@/router';

type MenuItem = {
	path?: string;
	name?: string;
	icon?: React.ReactNode;
	routes?: MenuItem[];
};

const loopMenuItem = (menus: Route[]): MenuItem[] =>
	menus.map(({ icon, path, name, children }) => ({
		path,
		name,
		icon,
		routes: children ? loopMenuItem(children) : undefined
	}));

const initPath = '/dashboard/workbench';
const BackendLaytout = () => {
	const settings: ProSettings | undefined = {
		fixSiderbar: true,
		layout: 'mix'
	};
	const location = useLocation();
	const [pathname, setPathname] = useState(location.pathname);

	return (
		<div
			style={{
				height: '100vh'
			}}
		>
			<ProLayout
				route={{ path: '/', routes: loopMenuItem(menuRoutes) }}
				siderWidth={216}
				location={{
					pathname
				}}
				avatarProps={{
					src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
					size: 'small',
					title: '七妮妮',
					render: (_props, dom) => {
						return (
							<Dropdown
								menu={{
									items: [
										{
											key: 'logout',
											icon: <LogoutOutlined />,
											label: '退出登录'
										}
									]
								}}
							>
								{dom}
							</Dropdown>
						);
					}
				}}
				actionsRender={(props) => {
					if (props.isMobile) return [];
					return [
						<InfoCircleFilled key="InfoCircleFilled" />,
						<QuestionCircleFilled key="QuestionCircleFilled" />,
						<GithubFilled key="GithubFilled" />
					];
				}}
				menuFooterRender={(props) => {
					if (props?.collapsed) return undefined;
					return (
						<div
							style={{
								textAlign: 'center',
								paddingBlockStart: 12
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
							overflow: 'auto'
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
