import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { TeacherType } from "@/types";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { useAsyncEffect, useRequest } from "ahooks";
import { Button, Form, message } from "antd";
import { useAtomValue } from "jotai";
import React, { useEffect, useMemo, useState } from "react";

interface AddTeacherProps {
  editData?: TeacherType;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

// 新增一个参数用于接收编辑的数据
const AddTeacher = ({ editData, onSuccess, trigger }: AddTeacherProps) => {
  const [form] = Form.useForm<TeacherType>();
  const { majorList, courseList } = useAtomValue(enumValuesAtom);
  const { runAsync: classListCreateGet } = useRequest(
    request.sgks.classListCreate,
    {
      manual: true,
    }
  );

  const [gradeList, setGradeList] = useState([]);

  useAsyncEffect(async () => {
    // const res = await classListCreateGet({ pageNo: 1, pageSize: 1000,classGrade: });
    // const res = await request.sgks.gradeListList({});
    // setGradeList(res.data.);
    form.setFieldsValue({ ...editData });
  }, []);

  return (
    <ModalForm<TeacherType>
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
          id: editData?.teacherId,
          opt: editData ? 1 : 2,
        });
        message.success(editData ? "编辑成功" : "提交成功");
        onSuccess?.();
        return true;
      }}
      // 如果有编辑数据，设置表单的初始值
      initialValues={editData}
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
      <ProFormTreeSelect
        name="classIds"
        label="所带班级"
        fieldProps={
          {
            // treeData: gradeList,
            // onTreeLoad
          }
        }
      ></ProFormTreeSelect>
      <ProFormText name="project" label="登陆密码" />
    </ModalForm>
  );
};

export default AddTeacher;
