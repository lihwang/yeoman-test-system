import request from "@/services/interceptors";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddObjectiveTopic from "./AddObjectiveTopic";

type LabelItem = {
  teacherId: number;
  teacherUserName: string;
  teacherRealName: string;
  /** 逗号隔开，所教课程 */
  courses: string;
  /** 逗号隔开，所教专业 */
  majors: string;
};

const columns: ProColumns<LabelItem>[] = [
  {
    title: "标签ID",
    dataIndex: "labelId",
    hideInSearch: true,
  },
  {
    title: "标签名称",
    dataIndex: "labelName",
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
