import request from "@/services/interceptors";
import { logout } from "@/store/indext";
import { AddEditProps } from "@/types";
import { EditFilled } from "@ant-design/icons";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

interface EditPasswordProps {
  oldPass: string;
  newPass: string;
}
const EditPassword = () => {
  const [form] = Form.useForm<EditPasswordProps>();
  return (
    <div className="w-[600px]">
      <ProForm<EditPasswordProps>
        title="修改登陆密码"
        labelCol={{ span: 4 }}
        layout="horizontal"
        form={form}
        autoFocusFirstInput
        onFinish={async (values) => {
          await request.sgks.teacherChangeOwnPassCreate(values);
          message.success("修改成功");
          logout();
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
      </ProForm>
    </div>
  );
};

export default EditPassword;
