import ClassSelect from "@/components/ClassSelect";
import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { ClassType, TeacherType } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormItem,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useAtomValue } from "jotai";
import React, { useState } from "react";

interface AddTeacherProps {
  editData?: TeacherType;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

// 新增一个参数用于接收编辑的数据
const AddTeacher = ({ editData, onSuccess, trigger }: AddTeacherProps) => {
  const [form] = Form.useForm<TeacherType>();
  const { majorList, courseList } = useAtomValue(enumValuesAtom);
  const [initClass, setInitClass] = useState<ClassType[]>([]);
  const onOpenChange = async (open: boolean) => {
    if (open) {
      if (editData?.teacherId) {
        const res: any = await request.sgks.teacherGetList({
          teacherId: editData.teacherId,
        });
        setInitClass(res.data?.classes);
        const classIds = res.data?.classes?.map((item: any) => item.classId);
        const majorIds = res.data?.majors?.map((item: any) => item.majorId);
        const courseIds = res.data?.courses?.map((item: any) => item.courseId);
        form.setFieldsValue({ ...res.data, majorIds, courseIds, classIds });
      }
    }
  };

  return (
    <ModalForm<TeacherType>
      onOpenChange={onOpenChange}
      title={editData ? "编辑教师" : "新建教师"}
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
      }}
      submitTimeout={2000}
      // 根据是否有编辑数据调用不同的接口
      onFinish={async (values) => {
        await request.sgks.teacherAddOrEditCreate({
          ...values,
          teacherId: editData?.teacherId,
          opt: editData ? 2 : 1,
        });
        message.success(editData ? "编辑成功" : "提交成功");
        onSuccess?.();
        return true;
      }}
      // 如果有编辑数据，设置表单的初始值
      initialValues={editData}
    >
      <ProFormText
        rules={[{ required: true }]}
        name="userName"
        label="教师用户名"
      />
      <ProFormText
        rules={[{ required: true }]}
        name="realName"
        label="教师姓名"
      />
      <ProFormSelect
        rules={[{ required: true }]}
        mode="multiple"
        label="课程"
        name="courseIds"
        options={courseList}
      ></ProFormSelect>
      <ProFormSelect
        rules={[{ required: true }]}
        mode="multiple"
        name="majorIds"
        label="专业"
        options={majorList}
      ></ProFormSelect>
      <ProFormItem label="班级" name="classIds" rules={[{ required: true }]}>
        <ClassSelect initClass={initClass} />
      </ProFormItem>
      {!editData && (
        <ProFormText
          name="teacherPass"
          label="登陆密码"
          rules={[{ required: true }]}
        />
      )}
    </ModalForm>
  );
};

export default AddTeacher;
