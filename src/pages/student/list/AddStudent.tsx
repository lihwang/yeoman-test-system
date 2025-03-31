import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormText,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const AddStudent = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建学员"
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
      <ProFormText required name="studentName" label="学员姓名" />
      <ProFormTreeSelect
        rules={[{ required: true }]}
        name="classId"
        label="年级"
      />
      <ProFormTreeSelect
        rules={[{ required: true }]}
        name="classId"
        label="队伍号"
      />
      <ProFormTreeSelect
        rules={[{ required: true }]}
        name="classId"
        label="班级"
      />
    </ModalForm>
  );
};

export default AddStudent;
