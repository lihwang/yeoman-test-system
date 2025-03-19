import { ContainerOutlined } from "@ant-design/icons";
import { Route } from ".";
import LabelsManage from "@/pages/topic/Labels";
import OperationTopic from "@/pages/topic/OperationTopic";
import ObjectiveTopic from "@/pages/topic/ObjectiveTopic";

const menuRoutes: Route[] = [
  {
    path: "topic",
    name: "题库管理",
    icon: <ContainerOutlined />,
    children: [
      {
        path: "labels",
        name: "标签库",
        element: <LabelsManage />,
      },
      {
        path: "objective",
        name: "客观题",
        element: <ObjectiveTopic />,
      },
      {
        path: "operation",
        name: "操作题",
        element: <OperationTopic />,
      },
    ],
  },
];

export default menuRoutes;
