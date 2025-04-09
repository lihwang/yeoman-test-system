import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { AddEditProps, ClassType } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

const AddClass = ({ editData, onSuccess, trigger }: AddEditProps) => {
  const [form] = Form.useForm<ClassType>();
  const { gradeList, majorList } = useAtomValue(enumValuesAtom);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        classGrade: editData?.classGrade,
        classTeam: editData?.classTeam,
        classUnit: editData?.classUnit,
        majorId: editData?.majorId,
      });
    }
  }, [editData]);
  return (
    <ModalForm<ClassType>
      title={editData ? "编辑班级" : "新建班级"}
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
        await request.sgks.classAddOrEditCreate({
          ...values,
          classId: editData?.classId,
          opt: editData ? 2 : 1,
        });
        message.success("提交成功");
        onSuccess?.();
        return true;
      }}
    >
      <ProFormSelect
        rules={[{ required: true }]}
        fieldProps={{
          options: gradeList,
        }}
        name="classGrade"
        label="年级"
      />
      <ProFormText rules={[{ required: true }]} name="classTeam" label="队别" />
      <ProFormText
        rules={[{ required: true }]}
        name="classUnit"
        label="区队号"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        fieldProps={{
          options: majorList,
        }}
        name="majorId"
        label="专业"
      />
    </ModalForm>
  );
};

export default AddClass;
