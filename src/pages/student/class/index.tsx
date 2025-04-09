import request from "@/services/interceptors";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddClass from "./AddClass";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { ClassType } from "@/types";
import { useAtomValue } from "jotai";
import { enumValuesAtom } from "@/store/enum";

const StudentClass = () => {
  const actionRef = useRef<ActionType>(null);
  const { majorList } = useAtomValue(enumValuesAtom);

  const columns: ProColumns<ClassType>[] = [
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
      title: "队别",
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
      valueType: "select",
      fieldProps: {
        options: majorList,
      },
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
        <AddClass
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
                await request.sgks.classDeleteDelete({
                  classId: +record.classId,
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
  return (
    <ProTable<ClassType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params: any) => {
        const res = await request.sgks.classListCreate({
          ...params,
          pageNo: params.current,
          pageSize: params.pageSize,
        });
        return {
          data: res.data.records,
          total: res.data.totalCount,
        };
      }}
      columnsState={{
        persistenceKey: "StudentClass_List",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
      }}
      pagination={{
        pageSize: 10,
      }}
      rowKey="classId"
      search={{
        labelWidth: "auto",
      }}
      toolBarRender={() => [
        <AddClass onSuccess={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default StudentClass;
