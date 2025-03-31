import request from "@/services/interceptors";
import { enumValuesAtom } from "@/store/enum";
import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useAtomValue } from "jotai";

interface AddClassProps {
  editData?: any;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}
const AddClass = ({ editData, onSuccess, trigger }: AddClassProps) => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  const { gradeList, majorList } = useAtomValue(enumValuesAtom);
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
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
          id: editData?.classId,
          opt: editData ? 2 : 1,
        });
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormSelect
        fieldProps={{
          options: gradeList,
        }}
        name="classGrade"
        label="年级"
      />
      <ProFormText name="classTeam" label="队伍号" />
      <ProFormText name="classUnit" label="区队号" />
      <ProFormSelect
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
