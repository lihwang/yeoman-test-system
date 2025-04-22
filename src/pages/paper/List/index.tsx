import request from "@/services/interceptors";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { useRef } from "react";
// import AddObjectiveTopic from "./AddObjectiveTopic";
import { enumToObject, QuestionTypeEnum } from "@/utils/enums";
import { Button, message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PaperType } from "@/types";
import { enumValuesAtom } from "@/store/enum";
import { useAtomValue } from "jotai";

const PaperList = () => {
  const actionRef = useRef<ActionType>(null);
  const navigate = useNavigate();
  const { courseList } = useAtomValue(enumValuesAtom);
  const columns: ProColumns<PaperType>[] = [
    {
      title: "试卷ID",
      dataIndex: "id",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "试卷名称",
      dataIndex: "name",
    },
    // {
    //   title: "课程查询",
    //   dataIndex: "courseId",
    //   hideInTable: true,
    //   valueType: "select",
    //   fieldProps: {
    //     options: courseList,
    //   },
    // },
    // {
    //   title: "所属课程",
    //   dataIndex: "courseName",
    //   hideInSearch: true,
    // },
    {
      title: "客观题数量",
      dataIndex: "questionCount",
      hideInSearch: true,
    },
    {
      title: "操作题数量",
      dataIndex: "exerciseCount",
      hideInSearch: true,
    },
    {
      title: "总分",
      dataIndex: "score",
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
      title: "操作",
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // action?.startEditable?.(record.id);
            navigate(`/paper/${record.id}`);
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
                await request.sgks.paperRemoveCreate({
                  id: +record.id,
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
    <ProTable<PaperType>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const res = await request.sgks.paperListList({
          ...params,
          pageNo: params.current,
          pageSize: params.pageSize,
        } as any);
        console.log(res);

        return {
          data: res.data.records,
          total: res.data?.totalCount,
        };
      }}
      columnsState={{
        persistenceKey: "PaperList_List",
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
        <Button
          type="primary"
          onClick={() => {
            navigate("/paper/info");
          }}
        >
          添加
        </Button>,
      ]}
    />
  );
};

export default PaperList;
