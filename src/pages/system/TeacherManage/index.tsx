import request from "@/services/interceptors";
import { ExclamationCircleFilled } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useRef } from "react";
import AddTeacher from "./AddTeacher";
import { Link } from "react-router-dom";
import EditPassword from "./EditPassword";

type TeacherItem = {
  teacherId: number;
  teacherUserName: string;
  teacherRealName: string;
  /** 逗号隔开，所教课程 */
  courses: string;
  /** 逗号隔开，所教专业 */
  majors: string;
};

const columns: ProColumns<TeacherItem>[] = [
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
  },
  {
    title: "所教专业",
    dataIndex: "majors",
  },
  {
    title: "操作",
    valueType: "option",
    key: "option",
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.teacherId);
        }}
      >
        编辑
      </a>,
      <Link to={{ pathname: `/user/teacher/${record.teacherId}` }}>查看</Link>,
      <a
        onClick={() => {
          Modal.confirm({
            title: "提示",
            icon: <ExclamationCircleFilled />,
            content: "确认停用该教师吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
              await request.sgks.teacherAbleDelete({
                teacherId: +record.teacherId,
                able: 1,
              });
              message.success("停用成功");
              action?.reload();
            },
          });
        }}
      >
        停用
      </a>,
      <EditPassword />,
    ],
  },
];

const TeacherManage = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<TeacherItem>
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
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      // headerTitle="高级表格"
      toolBarRender={() => [
        <AddTeacher />,
        // <Button
        //   key="button"
        //   icon={<PlusOutlined />}
        //   onClick={() => {
        //     // actionRef.current?.reload();
        //   }}
        //   type="primary"
        // >
        //   新建
        // </Button>,
      ]}
    />
  );
};

export default TeacherManage;
