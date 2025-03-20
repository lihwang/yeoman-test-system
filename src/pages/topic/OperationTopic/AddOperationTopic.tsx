import request from "@/services/interceptors";
import { enumToSelectOptions, ExerciseTypeEnum } from "@/utils/enums";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

type DataSourceType = {
  exerciseId: number;
  /** 操作题类型 */
  exerciseType: number;
  /** 操作题编码 */
  exerciseCode: string;
  /** 所属课程id */
  courseId: number;
  /** 题干 */
  exerciseStem: string;
  /** 解题提示 */
  exercisePrompt: string;
  /**
   * 答案文件
   * 字处理、电子表格、演示文稿的答案文件，oss路径
   */
  attachment: string;
  /**
   * 答案脚本
   * 用户在学员电脑上生产正确文件夹和文件的Windows shell脚本，基本操作题的正确答案
   */
  answerShell: string;
  /** 知识点标签 */
  labelIds: number[];
};

const AddObjectiveTopic = () => {
  const [form] = Form.useForm<DataSourceType>();
  return (
    <ModalForm<DataSourceType>
      title="新建操作题"
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
        await request.sgks.exerciseAddOrEditCreate(values);
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText required name="exerciseCode" label="题目标号" />
      <ProFormSelect
        required
        name="exerciseType"
        label="客观题类型"
        options={enumToSelectOptions(ExerciseTypeEnum)}
      />
      <ProFormTextArea required name="exerciseStem" label="题干" />
      <ProFormTextArea required name="exercisePrompt" label="解题提示" />
      <ProFormUploadDragger
        max={1}
        required
        name="attachment"
        label="答案文件"
      />
      <ProFormText required name="answerShell" label="答案脚本" />
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
        name="labelIds"
        mode="multiple"
        label="标签"
        options={[
          {
            label: "PPT专属",
            value: 1,
          },
        ]}
      />
    </ModalForm>
  );
};

export default AddObjectiveTopic;
