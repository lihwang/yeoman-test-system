import request from "@/services/interceptors";
import { useGetCourseList } from "@/utils";
import {
  enumToSelectOptions,
  QuestionTypeEnum,
  QuestionTypeList,
} from "@/utils/enums";
import { PlusOutlined } from "@ant-design/icons";
import {
  EditableProTable,
  ModalForm,
  ProColumns,
  ProForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useState } from "react";

type DataSourceType = {
  opionSgin?: string;
  opionContent?: string;
};
const defaultData: DataSourceType[] = [
  {
    opionSgin: "A",
    opionContent: "",
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: "选项",
    dataIndex: "opionContent",
    width: "50%",
  },
  {
    title: "操作",
    valueType: "option",
  },
];

interface FormProps {
  questionId?: number;
  /** 题目标号 */
  questionCode: string;
  /**
   * 客观题类型
   * 题目类型，1：填空题，2：选择题，3：判断题，4：问答题
   */
  questionType: number;
  /** 题干 */
  questionStem: string;
  /** 所属课程id */
  courseId: number;
  /**
   * 填空题和问答题答案
   * 逗号隔开
   */
  answerContent: string;
  /** 判断题答案 */
  answerTf: number;
  /** 选择题答案 */
  answerChoice: string;
  labelIds: {
    labelId: number;
  }[];
  options: {
    /** abcd */
    opionSgin: string;
    /** 选项内容 */
    opionContent: string;
  }[];
}

const AddObjectiveTopic = () => {
  const [courseList] = useGetCourseList();
  const [form] = Form.useForm<FormProps>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((i, idx) => idx)
  );
  return (
    <ModalForm<FormProps>
      title="新建客观题"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      }
      labelCol={{ span: 4 }}
      layout="horizontal"
      width={640}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log("run"),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await request.sgks.questionAddOrEditCreate(values);
        console.log(values.name);
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText required name="questionCode" label="题目标号" />
      <ProFormSelect
        required
        name="questionType"
        label="客观题类型"
        options={enumToSelectOptions(QuestionTypeEnum)}
      />
      <ProFormTextArea required name="questionStem" label="题干" />
      <ProFormSelect
        required
        name="courseId"
        label="所属课程"
        options={courseList}
      />
      <ProFormSelect
        required
        name="labels"
        mode="multiple"
        label="标签"
        options={[
          {
            label: "PPT专属",
            value: 1,
          },
        ]}
      />
      <ProFormDependency name={["questionType"]}>
        {({ questionType }) => {
          if (questionType === QuestionTypeEnum.判断题) {
            return (
              <ProFormSelect
                required
                name="answerTf"
                label="(判断题)答案"
                options={[
                  {
                    label: "对",
                    value: 1,
                  },
                  {
                    label: "错",
                    value: 2,
                  },
                ]}
              />
            );
          } else if (
            questionType === QuestionTypeEnum.填空题 ||
            questionType === QuestionTypeEnum.问答题
          ) {
            return (
              <ProFormTextArea
                placeholder={"多个答案使用逗号隔开"}
                required
                name="answerContent"
                label="答案"
              />
            );
          } else if (questionType === QuestionTypeEnum.选择题) {
            return (
              <>
                <ProForm.Item required label="选项" name="options">
                  <EditableProTable<DataSourceType>
                    rowKey="id"
                    toolBarRender={false}
                    columns={columns}
                    recordCreatorProps={{
                      newRecordType: "dataSource",
                      position: "top",
                      record: (index) => ({
                        id: index,
                        opionContent: "",
                      }),
                    }}
                    editable={{
                      type: "multiple",
                      editableKeys,
                      onChange: setEditableRowKeys,
                      actionRender: (row, _, dom) => {
                        return [dom.delete];
                      },
                    }}
                  />
                </ProForm.Item>
                <ProFormSelect
                  required
                  name="answerChoice"
                  label="(选择题)答案"
                  options={[
                    {
                      label: "A",
                      value: "A",
                    },
                    {
                      label: "B",
                      value: "B",
                    },
                  ]}
                />
              </>
            );
          }
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default AddObjectiveTopic;
