import request from "@/services/interceptors";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef } from "react";
import AddOperationTopic from "./AddOperationTopic";
import { enumToObject, ExerciseTypeEnum } from "@/utils/enums";
import { message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { OperationItem } from "@/utils/types";
import { useAtomValue } from "jotai";
import { enumValuesAtom } from "@/store/enum";

const columns: ProColumns<OperationItem>[] = [
  {
    title: "题目ID",
    dataIndex: "exerciseId",
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: "题目编号",
    dataIndex: "exerciseCode",
    hideInSearch: true,
  },
  {
    title: "题干",
    dataIndex: "exerciseStem",
  },
  {
    title: "题目类型",
    dataIndex: "exerciseType",
    valueEnum: enumToObject(ExerciseTypeEnum),
  },
  {
    title: "课程",
    dataIndex: "courseId",
    hideInTable: true,
  },
  {
    title: "课程名称",
    dataIndex: "courseName",
    hideInSearch: true,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    hideInSearch: true,
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    hideInSearch: true,
  },
  {
    title: "标签",
    dataIndex: "labels",
    valueType: "select",
    hideInTable: true,
    valueEnum: {
      1: "标签1",
      2: "标签",
    },
    render: (_, record) => {
      return record.labels.map((item) => item.labelName).join(",");
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
          action?.startEditable?.(record.exerciseId);
        }}
      >
        编辑
      </a>,
      <a
        onClick={() => {
          Modal.confirm({
            title: "提示",
            icon: <ExclamationCircleFilled />,
            content: "确认删除吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
              await request.sgks.exerciseDeleteList({
                exerciseId: +record.exerciseId,
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

const OperationTopic = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<OperationItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        const res = await request.sgks.exerciseListCreate({
          ...params,
          pageNo: params.current,
          pageSize: params.pageSize,
        } as any);
        console.log(params, sort, filter, res, "res");

        return {
          data: res.data,
          total: res.data,
        };
      }}
      columnsState={{
        persistenceKey: "OperationTopic_List",
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
      toolBarRender={() => [<AddOperationTopic />]}
    />
  );
};

export default OperationTopic;
