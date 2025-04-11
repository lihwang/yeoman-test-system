import request from "@/services/interceptors";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef } from "react";
import AddObjectiveTopic from "./AddObjectiveTopic";
import { enumToObject, QuestionTypeEnum } from "@/utils/enums";
import { message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { ObjectiveType } from "@/types";

const columns: ProColumns<ObjectiveType>[] = [
  {
    title: "题目ID",
    dataIndex: "questionId",
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: "题目编号",
    dataIndex: "questionCode",
    hideInSearch: true,
  },
  {
    title: "题干",
    dataIndex: "questionStem",
    tooltip: true,
    ellipsis: true,
  },

  {
    title: "题目类型",
    dataIndex: "questionType",
    valueEnum: enumToObject(QuestionTypeEnum),
  },
  {
    title: "课程",
    dataIndex: "courseId",
    hideInTable: true,
    // request: async () => {},
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    hideInSearch: true,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    valueType: "dateTime",
    hideInSearch: true,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    valueType: "dateTime",
    hideInSearch: true,
  },
  {
    title: "标签",
    dataIndex: "labels",
    valueType: "select",
    hideInSearch: true,
    render: (_, record) => {
      return record.labels.map((item) => item.labelName).join(",");
    },
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <AddObjectiveTopic
        editData={record}
        trigger={<a>编辑</a>}
        onSuccess={() => action?.reload()}
      />,
      <a
        onClick={() => {
          Modal.confirm({
            title: "提示",
            icon: <ExclamationCircleFilled />,
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
              await request.sgks.questionDeleteDelete({
                questionId: +record.questionId,
              });
              message.success("删除成功");
              action?.reload();
            },
          });
        }}
      >
        删除
      </a>,
    ],
  },
];

const ObjectiveTopic = () => {
  const actionRef = useRef<ActionType>(null);

  return (
    <ProTable<ObjectiveType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const res = await request.sgks.questionListCreate({
          ...params,
          pageNo: params.current,
          pageSize: params.pageSize,
        });
        return {
          total: res.data.totalCount,
          data: res.data.records,
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
      toolBarRender={() => [
        <AddObjectiveTopic onSuccess={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default ObjectiveTopic;
