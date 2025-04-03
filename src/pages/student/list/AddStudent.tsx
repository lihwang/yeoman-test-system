import ClassSelect from "@/components/ClassSelect";
import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { AddEditProps, ClassType, StudentType } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormItem,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useState } from "react";

const AddStudent = ({ onSuccess, editData, trigger }: AddEditProps) => {
  const [form] = Form.useForm<StudentType>();
  const [initClass, setInitClass] = useState<ClassType[]>([]);
  const onOpenChange = (visible: boolean) => {
    if (visible) {
      if (editData) {
        setInitClass([{ ...editData }]);
        setTimeout(() => {
          form.setFieldsValue({ ...editData, classId: [editData.classId] });
        });
      }
    }
  };

  return (
    <ModalForm<StudentType>
      onOpenChange={onOpenChange}
      title={editData ? "编辑学员" : "新建学员"}
      trigger={
        trigger || (
          <Button type="primary" icon={<PlusOutlined />}>
            新增
          </Button>
        )
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
        <ClassSelect initClass={initClass} multiple={false} />
      </ProFormItem>
    </ModalForm>
  );
};

export default AddStudent;
