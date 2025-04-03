import ClassSelect from "@/components/ClassSelect";
import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { AddEditProps, StudentType } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormItem,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

const AddStudent = ({ onSuccess, editData }: AddEditProps) => {
  const [form] = Form.useForm<StudentType>();
  const onOpenChange = (visible: boolean) => {
    if (visible) {
      if (editData) {
        form.setFieldsValue(editData);
      }
    }
  };

  return (
    <ModalForm<StudentType>
      onOpenChange={onOpenChange}
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
        await request.sgks.studentAddOrEditCreate({
          ...values,
          classId: values.classId[0],
          studentId: editData?.studentId,
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
        name="studentName"
        label="学员姓名"
      />
      <ProFormItem
        rules={[{ required: true }]}
        required
        name="classId"
        label="班级"
      >
        <ClassSelect multiple={false} />
      </ProFormItem>
    </ModalForm>
  );
};

export default AddStudent;
