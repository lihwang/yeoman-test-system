import request from "@/services/interceptors";
import { AddEditProps } from "@/types";
import { EditFilled } from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

interface EditPasswordProps {
  oldPass: string;
  newPass: string;
}
const EditPassword = ({ editData, onSuccess }: AddEditProps) => {
  const [form] = Form.useForm<EditPasswordProps>();
  return (
    <ModalForm<EditPasswordProps>
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
        // await request.sgks.teacherChangeOwnPassCreate({})
        console.log(values.name);
        message.success("提交成功");
        onSuccess?.();
        return true;
      }}
    >
      <ProFormText.Password
        rules={[{ required: true }]}
        name="oldPass"
        label="原密码"
      />
      <ProFormText.Password
        rules={[{ required: true }]}
        name="newPass"
        label="新密码"
      />
    </ModalForm>
  );
};

export default EditPassword;
