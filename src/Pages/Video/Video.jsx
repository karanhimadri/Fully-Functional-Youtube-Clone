import { useParams } from "react-router-dom";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import RecoSidebar from "../../components/Recomended/RecoSidebar";
import "./Video.css";

function Video() {
  const {categoryId, videoId} = useParams();

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      <RecoSidebar categoryId={categoryId} />
    </div>
  );
}

export default Video;
