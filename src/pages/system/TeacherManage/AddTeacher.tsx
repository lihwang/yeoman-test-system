import { courseList } from "@/utils/enums";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const AddTeacher = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="新建用户"
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
      <ProFormText name="company" label="教师用户名" />
      <ProFormText name="project" label="教师姓名" />
      <ProFormSelect
        mode="multiple"
        label="课程"
        options={courseList}
      ></ProFormSelect>
      <ProFormSelect
        mode="multiple"
        label="专业"
        options={courseList}
      ></ProFormSelect>
      <ProFormSelect
        mode="multiple"
        label="所带班级"
        options={courseList}
      ></ProFormSelect>
      <ProFormText name="project" label="登陆密码" />
    </ModalForm>
  );
};

export default AddTeacher;
