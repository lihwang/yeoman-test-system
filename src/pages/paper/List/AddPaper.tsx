import request from "@/services/interceptors";
import { TopicType } from "@/utils/enums";
import { ObjectiveItem, OperationItem } from "@/utils/types";
import {
  ProCard,
  ProColumns,
  ProList,
  ProTable,
} from "@ant-design/pro-components";
import { Tabs } from "antd";
import { useMemo, useState } from "react";

type TopicItem = ObjectiveItem | OperationItem;

const SearchTopicList = () => {
  const [topic, setTopic] = useState<TopicType>(TopicType.Objective);
  const columns: ProColumns<TopicItem>[] = useMemo(() => {
    return topic === TopicType.Objective
      ? [
          {
            title: "问题ID",
            dataIndex: "questionId",
            hideInSearch: true,
          },
          {
            title: "问题类型",
            dataIndex: "questionType",
          },
          {
            title: "题干",
            dataIndex: "questionStem",
          },
          {
            title: "知识点",
            dataIndex: "labels",
          },
        ]
      : [
          {
            title: "问题ID",
            dataIndex: "exerciseId",
            hideInSearch: true,
          },
          {
            title: "问题类型",
            dataIndex: "exerciseType",
          },
          {
            title: "题干",
            dataIndex: "questionStem",
          },
          {
            title: "知识点",
            dataIndex: "labels",
          },
        ];
  }, [topic]);

  const changeTabs = (e) => {
    setTopic(e as any);
  };

  return (
    <>
      <Tabs
        activeKey={topic}
        onChange={changeTabs}
        items={[
          {
            label: "客观题",
            key: TopicType.Objective,
          },
          {
            label: "操作题",
            key: TopicType.Objective,
          },
        ]}
      />
      <ProTable<TopicItem>
        request={async (params) => {
          const res =
            topic === TopicType.Objective
              ? await request.sgks.questionListList({
                  pageNo: params.current,
                  pageSize: params.pageSize,
                })
              : await request.sgks.exerciseListCreate({
                  pageNo: params.current,
                  pageSize: params.pageSize,
                });

          return {
            data: res,
          };
        }}
        toolBarRender={false}
        search={false}
        columns={columns}
      />
    </>
  );
};

const FinalPaper = () => {
  return <ProList<TopicItem> />;
};

const AddPaper = () => {
  return (
    <ProCard split="vertical">
      <ProCard colSpan="50%" ghost>
        <SearchTopicList />
      </ProCard>
      <ProCard title="试卷">
        <FinalPaper />
      </ProCard>
    </ProCard>
  );
};

export default AddPaper;
