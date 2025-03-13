import { EditFilled } from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const EditPassword = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="修改登陆密码"
      trigger={<a type="primary">密码修改</a>}
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
      <ProFormText.Password name="project" label="原密码" />
      <ProFormText.Password name="project1" label="新密码" />
    </ModalForm>
  );
};

export default EditPassword;
