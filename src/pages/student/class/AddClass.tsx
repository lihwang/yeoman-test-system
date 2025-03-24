import { PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const AddClass = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建班级"
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
      <ProFormText name="classGrade" label="年级" />
      <ProFormText name="classTeam" label="队别号" />
      <ProFormText name="classUnit" label="区队号" />
      <ProFormText name="majorId" label="专业" />
    </ModalForm>
  );
};

export default AddClass;
