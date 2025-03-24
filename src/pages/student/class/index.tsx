import request from "@/services/interceptors";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddClass from "./AddClass";
import { ExclamationCircleFilled } from "@ant-design/icons";

type ClassItem = {
  /**
   * 年级
   */
  classGrade: number;
  classid: number;
  /**
   * 队别号
   */
  classTeam: number;
  /**
   * 区队号
   */
  classUnit: number;
  /**
   * 专业id
   */
  majorid: number;
  /**
   * 专业名称
   */
  majorName: string;
};

const columns: ProColumns<ClassItem>[] = [
  {
    title: "班级ID",
    dataIndex: "classId",
    hideInSearch: true,
  },
  {
    title: "年级",
    dataIndex: "classGrade",
  },
  {
    title: "队伍号",
    dataIndex: "classTeam",
    hideInSearch: true,
  },
  {
    title: "区队号",
    dataIndex: "classUnit",
    hideInSearch: true,
  },
  {
    title: "专业ID",
    dataIndex: "majorId",
    hideInTable: true,
  },
  {
    title: "专业名称",
    dataIndex: "majorName",
    hideInSearch: true,
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.classid);
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
              await request.sgks.classDeleteDelete({
                classId: +record.classid,
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

const StudentClass = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<ClassItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => {
        const res = await request.sgks.classListCreate({
          ...params,
          pageNo: params.current,
          pageSize: params.pageSize,
        });
        return {
          data: res.data,
          total: res.data?.length,
        };
      }}
      columnsState={{
        persistenceKey: "StudentClass_List",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
      }}
      rowKey="classId"
      search={{
        labelWidth: "auto",
      }}
      toolBarRender={() => [<AddClass />]}
    />
  );
};

export default StudentClass;
