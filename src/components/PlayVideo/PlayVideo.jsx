import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import { API_KEY, ViewsModifier } from "../../data";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";

function PlayVideo({videoId}) {
  //const { videoId } = useParams;
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoDetails = async () => {
    const URL = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchYouTuberInfo = async () => {
    if (apiData) {
      const URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

      await fetch(URL)
        .then((response) => response.json())
        .then((data) => setChannelData(data.items[0]));
    }
  };

  const fetchComments = async () => {
    const URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchYouTuberInfo();
  }, [videoId, apiData]);

  useEffect(() => {
    fetchVideoDetails();
  }, [videoId]);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted ></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {ViewsModifier(apiData ? apiData.statistics.viewCount : 0)} Views
          &bull; {moment(apiData ? apiData.snippet.publishedAt : 0).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {ViewsModifier(apiData ? apiData.statistics.likeCount : 0)}
          </span>
          <span>
            <img src={dislike} alt="" />0
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.medium.url : jack}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? ViewsModifier(channelData.statistics.subscriberCount)
              : 0}{" "}
            Subscriber
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description : ""}</p>
        <hr />
        <h4>Comments</h4>
        {commentData &&
          commentData.map((item, index) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
              <div className="comment" key={index}>
                <img src={comment.authorProfileImageUrl} alt="" />
                <div>
                  <h3>
                    {comment.authorDisplayName}
                    <span>{moment(comment.publishedAt).fromNow()}</span>
                  </h3>
                  <p>{comment.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>{ViewsModifier(comment.likeCount)}</span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlayVideo;
