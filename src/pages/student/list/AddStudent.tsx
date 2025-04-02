import ClassSelect from "@/components/ClassSelect";
import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { AddEditProps, StudentType } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from "@ant-design/pro-components";
import { Button, Form, message, SelectProps } from "antd";
import { useAtomValue } from "jotai";
import { useState } from "react";

const AddStudent = ({ onSuccess, editData }: AddEditProps) => {
  const [form] = Form.useForm<StudentType>();
  // const { gradeList } = useAtomValue(enumValuesAtom);
  // const [teamList, setTeamList] = useState<SelectProps["options"]>([]);
  // const [classList, setClassList] = useState<SelectProps["options"]>([]);

  // const changeGrade = async (value: number) => {
  //   const res: any = await request.sgks.classTeamListList({ grade: value });
  //   setTeamList(
  //     [...new Set(res.data)].map((item: any) => ({
  //       label: item,
  //       value: item,
  //     }))
  //   );
  // };

  // const changeTeam = async (value: number) => {
  //   const grade = form.getFieldValue("classGrade");
  //   const res: any = await request.sgks.classUnitListList({
  //     classTeam: value,
  //     grade,
  //   });
  //   setClassList(
  //     [...new Set(res.data)].map((item: any) => ({
  //       label: item,
  //       value: item,
  //     }))
  //   );
  // };

  return (
    <ModalForm<StudentType>
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
