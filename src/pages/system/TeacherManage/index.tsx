import request from "@/services/interceptors";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddTeacher from "./AddTeacher";
import { useAtomValue } from "jotai";
import { enumValuesAtom } from "@/store/enum";
import { TeacherType } from "@/types";

const TeacherManage = () => {
  const actionRef = useRef<ActionType>(null);
  const { majorList, courseList } = useAtomValue(enumValuesAtom);
  const columns: ProColumns<TeacherType>[] = [
    {
      title: "教师ID",
      dataIndex: "teacherId",
      hideInSearch: true,
    },
    {
      title: "教师用户名",
      dataIndex: "userName",
    },
    {
      title: "教师姓名",
      dataIndex: "realName",
    },
    {
      title: "所教课程",
      dataIndex: "courses",
      hideInSearch: true,
    },
    {
      title: "所教课程",
      dataIndex: "courseList",
      hideInTable: true,
      filterMultiple: true,
      valueType: "select",
      fieldProps: {
        options: courseList,
        mode: "multiple",
      },
    },
    {
      title: "所教专业",
      dataIndex: "majors",
      hideInSearch: true,
    },
    {
      title: "所教专业",
      dataIndex: "majorList",
      hideInTable: true,
      filterMultiple: true,
      valueType: "select",
      fieldProps: {
        options: majorList,
        mode: "multiple",
      },
    },
    {
      title: "状态",
      dataIndex: "teacherStatus",
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
        <AddTeacher
          key="edit"
          editData={record}
          trigger={<a>编辑</a>}
          onSuccess={() => action?.reload()}
        />,
        <a
          onClick={() => {
            const teacherText = record.teacherStatus === 0 ? "启用" : "停用";
            Modal.confirm({
              title: "提示",
              icon: <ExclamationCircleFilled />,
              content: `确认${teacherText}该教师吗？`,
              okText: "确认",
              cancelText: "取消",
              onOk: async () => {
                await request.sgks.teacherAbleCreate({
                  teacherId: +record.teacherId,
                  able: record.teacherStatus === 0 ? 1 : 0,
                });
                message.success("操作成功");
                action?.reload();
              },
            });
          }}
        >
          {record.teacherStatus === 0 ? "启用" : "停用"}
        </a>,
        // <EditPassword />,
      ],
    },
  ];
  return (
    <ProTable<TeacherType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const res = await request.sgks.teacherListCreate({
          pageNo: params.current,
          pageSize: params.pageSize,
          courseList: [],
          majorList: [],
        });
        console.log(res, "res");

        return {
          total: res.data.totalCount,
          data: res.data.records,
        };
      }}
      editable={{
        type: "multiple",
      }}
      columnsState={{
        persistenceKey: "teachermanage_list",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
        onChange(value) {
          console.log("value: ", value);
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
      form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === "get") {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      // pagination={{
      //   pageSize: 10,
      // }}
      toolBarRender={() => [
        <AddTeacher key="add" onSuccess={() => actionRef.current?.reload()} />,
      ]}
    />
  );
};

export default TeacherManage;
