import request from "@/services/interceptors";
import { LabelType } from "@/types";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import { useEffect } from "react";

const AddLabel = ({ editData }: { editData: LabelType }) => {
  const [form] = Form.useForm<LabelType>();

  const triggerIcon = editData ? <EditOutlined /> : <PlusOutlined />;
  const triggerText = editData ? "编辑" : "新建";

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);
    }
  }, [editData, form]);

  return (
    <ModalForm<{
      LabelType;
    }>
      title="新建标签"
      trigger={
        <Button type="primary">
          {triggerIcon}
          {triggerText}
        </Button>
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
      onFinish={async (values) => {
        await request.sgks.lableAddOrEditCreate({
          ...values,
          labelId: editData?.labelId,
        });
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText name="labelName" label="标签名称" />
    </ModalForm>
  );
};

export default AddLabel;
