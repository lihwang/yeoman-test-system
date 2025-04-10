import request from "@/services/interceptors";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddStudent from "./AddStudent";
import { Link } from "react-router-dom";
import { StudentType } from "@/types";

const columns: ProColumns<StudentType>[] = [
  {
    title: "学员ID",
    dataIndex: "studentId",
    hideInSearch: true,
  },
  {
    title: "学员编号",
    dataIndex: "studentNo",
  },
  {
    title: "学员姓名",
    dataIndex: "studentName",
  },
  {
    title: "年级",
    dataIndex: "classGrade",
  },
  {
    title: "队别",
    dataIndex: "classTeam",
  },
  {
    title: "班级",
    dataIndex: "classUnit",
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
      <AddStudent
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
              await request.sgks.studentDeleteDelete({
                studentId: +record.studentId,
              });
              message.success("删除成功");
              action?.reload();
            },
          });
        }}
      >
        删除
      </a>,
      <Link to={`/student/record/${record.studentId}`}>考试记录</Link>,
    ],
  },
];

const StudentList = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<StudentType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const res = await request.sgks.studentListCreate({
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
        persistenceKey: "StudentList_List",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
      }}
      rowKey="studentId"
      search={{
        labelWidth: "auto",
      }}
      toolBarRender={() => [
        <AddStudent onSuccess={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default StudentList;
