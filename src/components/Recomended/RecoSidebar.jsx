import "./RecoSidebar.css";
import { useEffect, useState } from "react";
import { API_KEY, ViewsModifier } from "../../data";
import { Link } from "react-router-dom";

function RecoSidebar({ categoryId }) {
  const [recommVideos, serRecommVideos] = useState([]);

  const fetchVideosData = async () => {
    const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => serRecommVideos(data.items));
  };

  useEffect(() => {
    fetchVideosData();
  }, [categoryId]);

  return (
    <div className="recommended">
      {recommVideos && recommVideos.map((items, index) => {
        return (
          <Link to={`/video/${items.snippet.categoryId}/${items.id}`} key={index} className="side-video-list">
            <img src={items.snippet.thumbnails.medium.url} alt="" />
            <div className="vid-info">
              <h4>{items.snippet.title}</h4>
                    <p>{items.snippet.channelTitle}</p>
              <p>{ViewsModifier(items.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default RecoSidebar;
