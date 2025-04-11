import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { AddEditProps } from "@/types";
import { enumToSelectOptions, QuestionTypeEnum } from "@/utils/enums";
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
import { useAtomValue } from "jotai";
import { useState } from "react";

type DataSourceType = {
  optionSgin?: string;
  optionSign?: string;
};
const defaultData: DataSourceType[] = [
  {
    optionSgin: "A",
    optionSign: "",
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: "选项",
    dataIndex: "optionSign",
    editable: false,
  },
  {
    title: "选项值",
    dataIndex: "optionContent",
    render: (_, record, index) => {
      return index;
    },
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

const AddObjectiveTopic = ({ editData, onSuccess, trigger }: AddEditProps) => {
  const { courseList, labelList } = useAtomValue(enumValuesAtom);
  const [form] = Form.useForm<FormProps>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((i, idx) => idx)
  );
  const onOpenChange = async (open: boolean) => {
    if (open && editData) {
      const res = await request.sgks.questionGetList({
        questionId: editData?.questionId,
      });
      if (res.data.options?.length) {
        setEditableRowKeys(res.data.options.map((item) => item.optionId));
      }
      form.setFieldsValue({
        ...res.data,
        labelIds: res.data?.labels?.map((item) => item.labelId) ?? [],
      });
    }
  };
  return (
    <ModalForm<FormProps>
      onOpenChange={onOpenChange}
      title={editData ? "编辑客观题" : "新建客观题"}
      trigger={
        trigger || (
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        )
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
        await request.sgks.questionAddOrEditCreate({
          ...values,
          questionId: editData?.questionId,
          opt: editData ? 2 : 1,
        });
        console.log(values.name);
        message.success("提交成功");
        onSuccess?.();
        return true;
      }}
    >
      <ProFormText
        rules={[{ required: true }]}
        required
        name="questionCode"
        label="题目标号"
      />
      <ProFormSelect
        required
        name="questionType"
        label="客观题类型"
        rules={[{ required: true }]}
        options={enumToSelectOptions(QuestionTypeEnum)}
      />
      <ProFormTextArea required name="questionStem" label="题干" />
      <ProFormSelect
        required
        name="courseId"
        label="所属课程"
        rules={[{ required: true }]}
        options={courseList}
      />
      <ProFormSelect
        required
        name="labelIds"
        mode="multiple"
        label="标签"
        rules={[{ required: true }]}
        options={labelList}
      />
      <ProFormDependency name={["questionType"]}>
        {({ questionType }) => {
          if (questionType === QuestionTypeEnum.判断题) {
            return (
              <ProFormSelect
                rules={[{ required: true }]}
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
                rules={[{ required: true }]}
                name="answerContent"
                label="答案"
              />
            );
          } else if (questionType === QuestionTypeEnum.选择题) {
            return (
              <>
                <EditableProTable<DataSourceType>
                  name="options"
                  rowKey="optionId"
                  toolBarRender={false}
                  controlled
                  columns={columns}
                  formItemProps={{
                    label: "选项编辑",
                    required: true,
                    rules: [
                      {
                        validator: async (_, value) => {
                          if (value.length < 1) {
                            throw new Error("请至少添加一个选项");
                          }

                          if (value.length > 4) {
                            throw new Error("最多可以设置四个选项");
                          }
                        },
                      },
                    ],
                  }}
                  recordCreatorProps={{
                    newRecordType: "dataSource",
                    position: "bottom",
                    record: (index) => {
                      const letters = ["A", "B", "C", "D"];
                      const letter = letters[index] || "";
                      return {
                        optionId: index,
                        optionSign: letter,
                        optionContent: "",
                      };
                    },
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
                <ProFormSelect
                  rules={[{ required: true }]}
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
                    {
                      label: "C",
                      value: "C",
                    },
                    {
                      label: "D",
                      value: "D",
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
