import { AimOutlined } from "@ant-design/icons";
import { Route } from ".";
import ObjectiveTopic from "@/pages/Recommend/ObjectiveTopic";

const recommend: Route[] = [
  {
    path: "recommend",
    name: "学员推荐列表",
    icon: <AimOutlined />,
    children: [
      {
        path: "objective",
        name: "主观题",
        element: <ObjectiveTopic />,
      },
    ],
  },
];

export default recommend;
