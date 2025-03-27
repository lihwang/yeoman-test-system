import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { TeacherType } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, Form, message } from "antd";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

const AddTeacher = () => {
  const [form] = Form.useForm<TeacherType>();
  const { majorList, courseList } = useAtomValue(enumValuesAtom);
  // const { data: classRes } = useRequest(request.sgks.classListCreate, {
  //   defaultParams: {
  //     pageNo: 1,
  //     pageSize: 1000,
  //   },
  // });

  // const classList = useMemo(() => {
  //   return classRes?.data?.records?.map((item) => {
  //     return {
  //       value: item.classId,
  //       label: item.className,
  //     };
  //   });
  // }, [classRes]);

  return (
    <ModalForm<TeacherType>
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
        const res = await request.sgks.teacherAddOrEditCreate(values);
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText name="userName" label="教师用户名" />
      <ProFormText name="realName" label="教师姓名" />
      <ProFormSelect
        mode="multiple"
        label="课程"
        name="courseIds"
        options={courseList}
      ></ProFormSelect>
      <ProFormSelect
        mode="multiple"
        name="majorIds"
        label="专业"
        options={majorList}
      ></ProFormSelect>
      <ProFormSelect
        mode="multiple"
        name="classIds"
        label="所带班级"
        options={courseList}
      ></ProFormSelect>
      <ProFormText name="project" label="登陆密码" />
    </ModalForm>
  );
};

export default AddTeacher;
