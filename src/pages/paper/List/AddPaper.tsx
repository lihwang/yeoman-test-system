import { ProCard, ProList, ProTable } from "@ant-design/pro-components";

interface TopicItem {
  id?: string;
}

const SearchTopicList = () => {
  return <ProTable<TopicItem> />;
};

const FinalPaper = () => {
  return <ProList<TopicItem> />;
};

const AddPaper = () => {
  return (
    <ProCard split="vertical">
      <ProCard colSpan="384px" ghost>
        <SearchTopicList />
      </ProCard>
      <ProCard title="试卷">
        <FinalPaper />
      </ProCard>
    </ProCard>
  );
};

export default AddPaper;
