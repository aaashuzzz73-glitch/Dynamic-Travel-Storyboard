
import "./TravelIntro.css";

const TravelIntro = () => {
  return (
    <div className="travel-intro">
      <div className="intro-glow intro-glow-one" />
      <div className="intro-glow intro-glow-two" />

      <div className="intro-map-layer">
        <svg
          className="intro-world-map"
          viewBox="0 0 1000 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="map-land">
            <path d="M95 115 L135 75 195 65 230 95 275 100 290 145 255 175 230 215 190 230 160 205 125 195 100 155Z" />
            <path d="M245 245 L285 260 305 305 290 360 270 420 245 390 230 335Z" />
            <path d="M390 100 L440 75 485 90 515 120 555 115 590 145 570 175 530 185 500 220 455 205 420 175Z" />
            <path d="M455 220 L500 210 540 245 550 300 520 365 485 385 455 335 435 280Z" />
            <path d="M570 105 L640 65 730 75 790 110 850 120 885 165 850 200 790 190 755 220 700 200 660 165 610 175Z" />
            <path d="M750 285 L795 270 835 300 825 345 785 365 755 335Z" />
            <path d="M870 390 L900 380 925 400 905 425 875 420Z" />
          </g>

          <g className="intro-route">
            <path
              className="route-line"
              d="M180 155 Q330 20 500 180 T815 155"
            />
            <circle cx="180" cy="155" r="6" className="route-dot" />
            <circle cx="815" cy="155" r="6" className="route-dot" />
          </g>

          <g className="intro-plane">
            <text x="0" y="0">✈</text>
          </g>
        </svg>
      </div>

      <div className="intro-content">
        <span className="intro-kicker">
          YOUR JOURNEY BEGINS HERE
        </span>

        <h1>DYNAMIC TRAVEL STORYBOARD</h1>

        <p>Every journey tells a story.</p>

        <span className="intro-tagline">
          EXPLORE <i>·</i> DISCOVER <i>·</i> REMEMBER
        </span>
      </div>

      <div className="intro-bottom">
        <span>PREPARING YOUR JOURNEY</span>
        <div className="intro-progress">
          <span />
        </div>
      </div>
    </div>
  );
};

export default TravelIntro;
