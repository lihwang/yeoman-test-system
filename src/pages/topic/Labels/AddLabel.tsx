import { PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const AddLabel = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建标签"
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
      <ProFormText name="labelName" label="标签名称" />
    </ModalForm>
  );
};

export default AddLabel;
