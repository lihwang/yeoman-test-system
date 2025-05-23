import request from "@/services/interceptors";
import { LabelType } from "@/types";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import React, { useEffect } from "react";

const AddLabel = ({
  editData,
  trigger,
  onSuccess,
}: {
  editData?: LabelType;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}) => {
  const [form] = Form.useForm<LabelType>();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      form.resetFields();
    } else {
      if (editData) {
        console.log(editData, "editData");
        form.setFieldsValue(editData);
      }
    }
  };

  return (
    <ModalForm<{
      LabelType;
    }>
      title={editData ? "编辑标签" : "新建标签"}
      onOpenChange={onOpenChange}
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
      onFinish={async (values) => {
        await request.sgks.labelAddOrEditCreate({
          ...values,
          labelId: editData?.labelId,
        });
        message.success("提交成功");
        onSuccess?.();
        return true;
      }}
    >
      <ProFormText name="labelName" label="标签名称" />
    </ModalForm>
  );
};

export default AddLabel;
