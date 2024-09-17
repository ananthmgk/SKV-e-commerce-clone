import "../styles/Shimmer.css";
import LoadingGif from "../assets/Images/Shimmer/Loading gif.gif";

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer"></div>
      <img
        src={LoadingGif} //  GIF or image
        alt="Loading..."
        className="shimmer-loading-icon"
      />
    </div>
  );
};

export default Shimmer;
