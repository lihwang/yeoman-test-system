import { FileTextOutlined } from "@ant-design/icons";
import { Route } from ".";
import PaperList from "@/pages/paper/List";
import AddPaper from "@/pages/paper/List/AddPaper";

const paper: Route[] = [
  {
    path: "paper",
    name: "试卷管理",
    icon: <FileTextOutlined />,
    children: [
      {
        path: "list",
        name: "试卷列表",
        element: <PaperList />,
      },
      {
        path: "info",
        name: "试卷详情",
        element: <AddPaper />,
        hidden: true,
      },
    ],
  },
];

export default paper;
