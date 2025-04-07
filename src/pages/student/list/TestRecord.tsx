import { ProTable } from "@ant-design/pro-components";
import { useParams } from "react-router-dom";

const TestRecord = () => {
  const params = useParams();
  const { studentId } = params;

  return (
    <ProTable<TableListItem>
      // dataSource={tableListDataSource}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      columns={columns}
      search={false}
      dateFormatter="string"
      headerTitle="表格标题"
      toolBarRender={() => [
        <Button key="show">查看日志</Button>,
        <Button key="out">
          导出数据
          <DownOutlined />
        </Button>,
        <Button type="primary" key="primary">
          创建应用
        </Button>,
      ]}
    />
  );
};

export default TestRecord;
