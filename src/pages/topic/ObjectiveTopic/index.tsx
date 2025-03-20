import request from "@/services/interceptors";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddObjectiveTopic from "./AddObjectiveTopic";

type LabelItem = {
  questionId: number;
  /** 题目编号 */
  questionCode: string;
  /** 题目类型 */
  questionType: string;
  /** 课程id */
  courseId: string;
  /** 课程名称 */
  courseName: string;
  labels: {
    labelId: number;
    labelName: string;
  }[];
  createTime: string;
  updateTime: string;
};

const columns: ProColumns<LabelItem>[] = [
  {
    title: "题目ID",
    dataIndex: "questionId",
    hideInSearch: true,
  },
  {
    title: "题目编号",
    dataIndex: "courseId",
  },
  {
    title: "题目编号",
    dataIndex: "questionCode",
  },
  {
    title: "标签",
    dataIndex: "labels",
    valueType: "select",
    valueEnum: {
      1: { text: "标签1", status: "success" },
      2: { text: "标签2", status: "error" },
      3: { text: "标签3", status: "default" },
    },
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.labelId);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const LabelsManage = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<LabelItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const res = await request.sgks.questionListList({
          ...params,
          pageNo: params.current,
          pageSize: params.pageSize,
        } as any);
        return {
          data: res.data,
        };
      }}
      columnsState={{
        persistenceKey: "ObjectiveTopic_List",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
      }}
      rowKey="id"
      search={{
        labelWidth: "auto",
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={false}
      dateFormatter="string"
      toolBarRender={() => [<AddObjectiveTopic />]}
    />
  );
};

export default LabelsManage;
