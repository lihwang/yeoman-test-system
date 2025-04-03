import { ClassType } from "@/types";
import { ProTable } from "@ant-design/pro-components";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { Modal, Select } from "antd";
import { useAtomValue } from "jotai";
import { enumValuesAtom } from "@/store/enum";
import { useEffect, useRef, useState } from "react";
import request from "@/services/interceptors";
import { useAsyncEffect } from "ahooks";

interface ClassSelectProps {
  value?: number[];
  onChange?: (value: number[]) => void;
  multiple?: boolean;
}

const ClassSelect: React.FC<ClassSelectProps> = ({
  value = [],
  onChange,
  multiple = true,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ClassType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<number[]>(value || []);
  const actionRef = useRef<ActionType>(null);
  const { majorList, gradeList } = useAtomValue(enumValuesAtom);
  // 初始化已选数据
  useAsyncEffect(async () => {
    if (Array.isArray(value) ? !!value?.length : !!value) {
      const classIds = Array.isArray(value) ? value : [value];
      const res = await request.sgks.classGetByIdsList({
        classIds: classIds,
      });
      setSelectedRows(res.data.records || []);
      setSelectedKeys(value);
    }
  }, [value]);

  // 处理选择变化
  const handleSelectionChange = (keys: any[], rows: ClassType[]) => {
    // 合并当前页选中的数据
    const newSelectedRows = selectedRows
      .filter((item) => !rows.find((row) => row.classId === item.classId))
      .concat(rows);

    setSelectedKeys(keys);
    setSelectedRows(newSelectedRows);
  };

  const columns: ProColumns<ClassType>[] = [
    {
      title: "年级",
      dataIndex: "classGrade",
      valueType: "select",
      fieldProps: {
        options: gradeList,
      },
    },
    {
      title: "队伍号",
      dataIndex: "classTeam",
      hideInSearch: true,
    },
    {
      title: "区队号",
      dataIndex: "classUnit",
      hideInSearch: true,
    },
    {
      title: "专业ID",
      dataIndex: "majorId",
      hideInTable: true,
      valueType: "select",
      fieldProps: {
        options: majorList,
      },
    },
    {
      title: "专业名称",
      dataIndex: "majorName",
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Select
        placeholder="请选择班级"
        mode={multiple ? "multiple" : undefined}
        value={value}
        onChange={onChange}
        onClick={() => setOpen(true)}
        style={{ width: "100%" }}
        options={selectedRows.map((item) => ({
          label: `${item.classGrade}年级${item.classTeam}队${item.classUnit}区队`,
          value: item.classId,
        }))}
      />
      <Modal
        title="选择班级"
        open={open}
        onOk={() => {
          onChange?.(selectedKeys);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <ProTable<ClassType>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          options={false}
          rowKey="classId"
          rowSelection={{
            type: multiple ? "checkbox" : "radio",
            selectedRowKeys: selectedKeys,
            onChange: handleSelectionChange,
            preserveSelectedRowKeys: true, // 保持选中状态
          }}
          tableAlertRender={false}
          pagination={{ pageSize: 10 }}
          request={async (params) => {
            const res = await request.sgks.classListCreate({
              ...params,
              pageNo: params.current,
              pageSize: params.pageSize,
            });
            return {
              data: res.data.records,
              total: res.data.totalCount,
            };
          }}
        />
      </Modal>
    </>
  );
};

export default ClassSelect;
