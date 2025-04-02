import ClassSelect from "@/components/ClassSelect";
import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { TeacherType } from "@/types";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { useAsyncEffect, useRequest } from "ahooks";
import { Button, Form, message, TreeSelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useAtomValue } from "jotai";
import React, { use, useEffect, useMemo, useState } from "react";

interface AddTeacherProps {
  editData?: TeacherType;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

interface GradeClassType {
  label: string;
  value: string;
  children?: GradeClassType[];
}

// 新增一个参数用于接收编辑的数据
const AddTeacher = ({ editData, onSuccess, trigger }: AddTeacherProps) => {
  const [form] = Form.useForm<TeacherType>();
  const { majorList, courseList, gradeList } = useAtomValue(enumValuesAtom);
  const [treeData, setTreeData] =
    useState<Omit<DefaultOptionType, "label">[]>();

  const onLoadData: TreeSelectProps["loadData"] = async ({ level, value }) => {
    // setTreeData(treeData.concat([]));
    if (level === 0) {
      const res = await request.sgks.classTeamListList({ grade: +value });
    }
    return undefined;
  };

  const { runAsync: classListCreateGet } = useRequest(
    request.sgks.classListCreate,
    {
      manual: true,
    }
  );

  useEffect(() => {
    setTreeData(
      gradeList?.map((i) => {
        return {
          level: 0,
          value: i.value,
          label: i.label,
          isLeaf: false,
          disableCheckbox: true,
          selectable: false,
        };
      }) ?? []
    );
  }, [gradeList]);

  useAsyncEffect(async () => {
    if (editData?.teacherId) {
      const res = await request.sgks.teacherGetList({
        teacherId: editData.teacherId,
      });
      console.log(res.data);
      form.setFieldsValue({ ...editData });
    }
    // const res = await classListCreateGet({ pageNo: 1, pageSize: 1000,classGrade: });
    // const res = await request.sgks.gradeListList({});
    // setGradeList(res.data.);
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
        <ClassSelect />
      </ProFormItem>
      <ProFormText
        name="project"
        label="登陆密码"
        rules={[{ required: true }]}
      />
    </ModalForm>
  );
};

export default AddTeacher;
