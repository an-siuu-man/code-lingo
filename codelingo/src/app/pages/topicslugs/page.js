import { useRouter } from 'next/router';
//uncomment this line when the editor is ready
// import Editor from '../../components/Editor';
// import Terminal from '../../components/Terminal';
// import Visualizer from '../../components/Visualizer';

const TopicPage = () => {
  const router = useRouter();
  const { topicSlug } = router.query;

  return (
    <div>
      <h1>{topicSlug}</h1>
      {/* <Editor />
      <Terminal />
      <Visualizer /> */}
    </div>
  );
};

export default TopicPage;
