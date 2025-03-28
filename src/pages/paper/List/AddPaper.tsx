import request from "@/services/interceptors";
import {
  enumToObject,
  ExerciseTypeEnum,
  QuestionTypeEnum,
  TopicType,
} from "@/utils/enums";
import { ObjectiveItem, OperationItem } from "@/utils/types";
import {
  ProCard,
  ProColumns,
  ProList,
  ProTable,
} from "@ant-design/pro-components";
import { Button, message, Modal, Tabs } from "antd";
import { useMemo, useRef, useState } from "react";

type TopicItem = ObjectiveItem | OperationItem;

const AddPaper = () => {
  const [topic, setTopic] = useState<TopicType>(TopicType.Objective);
  const actionRef = useRef<any>(null);
  const [topicList, setTopicList] = useState<TopicItem[]>([]);

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
            valueEnum: enumToObject(QuestionTypeEnum),
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
            valueEnum: enumToObject(ExerciseTypeEnum),
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
    actionRef.current?.reload();
  };
  return (
    <ProCard split="vertical">
      <ProCard colSpan="65%" ghost>
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
                key: TopicType.Operation,
              },
            ]}
          />
          <ProTable<TopicItem>
            actionRef={actionRef}
            request={async (params) => {
              const res =
                topic === TopicType.Objective
                  ? await request.sgks.questionListCreate({
                      pageNo: params.current,
                      pageSize: params.pageSize,
                    })
                  : await request.sgks.exerciseListCreate({
                      pageNo: params.current,
                      pageSize: params.pageSize,
                    });

              return {
                data: res.data,
              };
            }}
            search={{
              labelWidth: "auto",
            }}
            pagination={{
              pageSize: 10,
            }}
            toolBarRender={false}
            columns={columns}
          />
        </>
      </ProCard>
      <ProCard>
        <>
          <div className="flex justify-between w-full">
            <span>试卷</span>
            <Button
              type="primary"
              onClick={() => {
                Modal.confirm({
                  title: "提示",
                  content: "确定保存试卷吗？",
                  onOk: () => {
                    message.success("保存成功");
                  },
                });
              }}
            >
              保存
            </Button>
          </div>
          <ProList<TopicItem> dataSource={topicList} />
        </>
      </ProCard>
    </ProCard>
  );
};

export default AddPaper;
