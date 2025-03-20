import { QuestionTypeEnum, QuestionTypeList } from "@/utils/enums";
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

const AddObjectiveTopic = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((i, idx) => idx)
  );
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
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
        options={QuestionTypeList}
      />
      <ProFormTextArea required name="questionStem" label="题干" />
      <ProFormSelect
        required
        name="courseId"
        label="所属课程"
        options={[
          {
            label: "计算机科学与技术",
            value: 1,
          },
        ]}
      />
      <ProFormSelect
        required
        name="courseId"
        mode="multiple"
        label="标签"
        options={[
          {
            label: "PPT专属",
            value: { labelId: 1 },
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
                <ProForm.Item label="选项" name="options">
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
