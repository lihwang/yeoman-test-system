import request from "@/services/interceptors";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddLabel from "./AddLabel";
import { LabelType } from "@/types";

const columns: ProColumns<LabelType>[] = [
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
    title: "标签状态",
    dataIndex: "labelStatus",
    hideInSearch: true,
    valueEnum: {
      1: {
        text: "启用",
        status: "success",
      },
      0: {
        text: "停用",
        status: "error",
      },
    },
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <AddLabel
        key="edit"
        editData={record}
        trigger={<a>编辑</a>}
        onSuccess={() => action?.reload()}
      ></AddLabel>,
      <a
        onClick={() => {
          const labelText = record.labelStatus === 1 ? "停用" : "启用";
          Modal.confirm({
            title: "提示",
            icon: <ExclamationCircleFilled />,
            content: `确认${labelText}该标签吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
              await request.sgks.labelAbleCreate({
                labelId: +record.labelId,
                able: record.labelStatus === 1 ? 0 : 1,
              });
              message.success("操作成功");
              action?.reload();
            },
          });
        }}
      >
        停用
      </a>,
    ],
  },
];

const LabelsManage = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<LabelType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const res = await request.sgks.labelListList({
          labelName: params.labelName,
        });
        return {
          data: res.data,
        };
      }}
      columnsState={{
        persistenceKey: "Labels_List",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
      }}
      search={{
        labelWidth: "auto",
      }}
      pagination={false}
      toolBarRender={() => [
        <AddLabel onSuccess={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default LabelsManage;
