import styled from "styled-components";
import { keyframes } from "styled-components";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styled Components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0, 0.9));
  padding: 1vw;
  gap: 10px;
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Quality = styled.div`
  height: 200px;
  width: 100px;
  background-color: white;
  z-index: 1;
  position: absolute;
  left: 10%;
  bottom: 90%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  visibility: hidden;
`
const Choice = styled.div`
  background-color: purple;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  &:hover{
    background-color: green;
  }
`

const Button = styled.button`
  background: none;
  outline: none;
  box-shadow: none;
  border: none;
  width: 4vw;
  height: 4vw;
  min-height: 40px;
  min-width: 40px;
  margin: 0px 1vw;
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    opacity: 1;
    transform: scale(1.3);
  }

  

  svg {
    fill: ${(props) => (props.filled ? "white" : "none")};
    transform: ${(props) => (props.rotate ? "rotateY(180deg)" : undefined)};
    transform: ${(props) => (props.revolve === true ? "rotateZ(60deg)" : undefined)};
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 100%;
    height: 100%;
  }

  &:hover{
    ${Quality}{
      visibility: visible;
    }
  }
`;

const Back = styled.button`
  position: fixed;
  top: 10px;
  left: 10px;
  background: none;
  outline: none;
  box-shadow: none;
  border: none;
  width: 2.5vw;
  height: 2.5vw;
  min-height: 25px;
  min-width: 25px;
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  &::before {
    content: attr(data-hover);
    visibility: hidden;
    opacity: 0;
    background-color: black;
    color: #fff;
    text-align: center;
    transition: opacity 1s ease-in-out;
    position: absolute;
    z-index: 1;
    left: 20%;
    top: 110%;
  }
  &:hover {
    opacity: 1;
    transform: scale(1.3);
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
  }

  svg {
    fill: ${(props) => (props.filled ? "white" : "none")};
    transform: ${(props) => (props.rotate ? "rotateY(180deg)" : undefined)};
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 100%;
    height: 100%;
  }
`;

const Volume = styled.input`
  -webkit-appearance: none;
  height: 5px;
  width: 20vw;
  margin-right: 1vw;
  background-color: #bdc3c7;
  border-radius: 5px;
  outline: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #e74c3c;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: white;
      border: 2px solid #e74c3c;
    }

    &:active {
      transform: scale(1.15);
    }
  }
`;

const Title = styled.p`
  font-size: 2vw;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Series = styled.span`
  color: #fefefe;
  font-weight: bold;
  font-size: 1em;
`;

const Episode = styled.span`
  color: #a1a1a1;
  font-size: 0.75em;
  padding-left: 1vw;
`;

const ProgressControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 95%;
  height: 1vw;
  max-height: 5px;
  background-color: #5b5b5b;
  display: flex;
  align-items: center;
`;

const WatchedBar = styled.div`
  background-color: #e31221;
  height: 130%;
  display: inline-block;
  transition: all 0.05s ease;
`;

const LoadedBar = styled.div`
  background-color: #303030;
  height: 120%;
  display: inline-block;
  transition: all 0.05s ease;
`

const Playhead = styled.div`
  background-color: #e31221;
  height: 3vw;
  width: 3vw;
  max-height: 20px;
  max-width: 20px;
  border-radius: 50%;
  display: inline-block;
`;

const Time = styled.div`
  color: white;
  margin: 1vw;
  width: 1%;
`;

const spin = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const Loading = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;

  div {
    position: absolute;
    border: 2px solid #bb00ff;
    opacity: 1;
    border-radius: 50%;
    animation: ${spin} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

function Videooo() {
  const navigate = useNavigate();

  // temp Refrences
  const temp_player = useRef();
  const temp_video = useRef();
  const temp_next = useRef();
  const temp_episodes = useRef();
  const temp_captions = useRef();
  const temp_cast = useRef();
  const temp_fullscreen = useRef();

  // Refs
  const player = temp_video.current;
  const video = temp_video.current;
  const next = temp_next.current;
  const episodes = temp_episodes.current;
  const captions = temp_captions.current;
  const cast = temp_cast.current;
  const fullscreen = temp_fullscreen.current;

  //States
  const [quality, setQuality] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [watched, setWatched] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState("00:00");
  const [isMute, setIsMute] = useState(false);
  const { ep_id } = useParams();
  const index = ep_id.search("-episode");
  const anime_id = ep_id.slice(0, index);
  const episode_no = ep_id.slice(index + 9);
  const [link, setLink] = useState("");

  const getData = async (abort) => {
    const link = `https://api.consumet.org/anime/gogoanime/watch/${ep_id}`;
    const api = await fetch(link, { signal: abort.signal });
    const ep_data = await api.json();
    setQuality(ep_data.sources);
    setLink(ep_data.sources[0]["url"]);
  };

  const getAnime = async (abort) => {
    const link = `https://api.consumet.org/anime/gogoanime/info/${anime_id}`;
    const api = await fetch(link, { signal: abort.signal });
    const ep_data = await api.json();
    setDetails(ep_data);
  };

  useEffect(() => {
    const abortCont = new AbortController();
    getData(abortCont);
    getAnime(abortCont);
    return () => {
      abortCont.abort();
    };
  }, []);

  //functions

  const handleVolumePicker = () => {
    video.player.player.player.muted = !video.player.player.player.muted;
    setIsMute(!isMute);
  };

  const handleVolume = (e) => {
    video.player.player.player.volume = e.target.value;
  };


  return (
    <>
      <Back onClick={() => navigate(-1)} data-hover="Go Back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </Back>
      <Container ref={temp_player}>
        <ReactPlayer
          url={link}
          ref={temp_video}
          playing
          height="100%"
          width="100%"
          onReady={() => {
            setLoading(false);
            video.player.player.player.volume = 0.1;
            console.log('ready');
          }}

          onProgress={() => {
            setWatched(
              (video.player.player.player.currentTime /
                video.player.player.player.duration) *
                100
            );

            setLoaded(
              (player.getSecondsLoaded() / player.getDuration()) * 100
            )
            const totalSecRemaining =
              video.player.player.player.duration -
              video.player.player.player.currentTime;
            const minRemaining = Math.floor(totalSecRemaining / 60);
            const secRemaining = Math.floor(
              totalSecRemaining - minRemaining * 60
            );
            setTimeRemaining(
              `${minRemaining.toString().padStart(2, "0")}:${secRemaining
                .toString()
                .padStart(2, "0")}`
            );  
          }}
          style={loading ? { display: "none" } : undefined}
        ></ReactPlayer>

        {loading && (
          <Loading>
            <div></div>
            <div></div>
          </Loading>
        )}

        {!loading && (
          <ControlsContainer>
            <ProgressControl>
              <ProgressBar>
                <WatchedBar style={{ width: `${watched}%` }}></WatchedBar>
                <Playhead></Playhead>
                <LoadedBar style={{ width: `${loaded}%` }}></LoadedBar> 
              </ProgressBar>
              <Time>{timeRemaining}</Time>
            </ProgressControl>

            <Controls>
              {/* Play/Pause */}
              <Button
                filled
                onClick={() => {
                  if (video.player.isPlaying) {
                    video.player.player.player.pause();
                    setIsPaused(true);
                  } else {
                    video.player.player.player.play();
                    setIsPaused(false);
                  }
                }}
              >
                {isPaused && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}

                {!isPaused && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                )}
              </Button>

              {/* rewind */}
              <Button
                filled
                onClick={() => {
                  video.player.player.player.currentTime -= 10;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <polygon points="11 19 2 12 11 5 11 19" />
                  <polygon points="22 19 13 12 22 5 22 19" />
                </svg>
              </Button>

              {/* Fast-Foward */}
              <Button
                filled
                onClick={() => {
                  video.player.player.player.currentTime += 10;
                }}
              >
                <svg viewBox="0 0 24 24">
                  <polygon points="13 19 22 12 13 5 13 19"></polygon>
                  <polygon points="2 19 11 12 2 5 2 19"></polygon>
                </svg>
              </Button>

              {/* Volume */}
              <Button filled onClick={handleVolumePicker}>
                {!isMute && (
                  <svg viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path
                      d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
                      fill="none"
                    ></path>
                  </svg>
                )}

                {isMute && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                )}
              </Button>

              {/* volume picker */}
              {!isMute && (
                <Volume
                  type={"range"}
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue={video.player.player.player.volume}
                  onChange={handleVolume}
                />
              )}

              {/*console.log(quality) */}

              <Title>
                <Series>{details["title"]}: </Series>
                <Episode>Episode {episode_no}</Episode>
              </Title>

              {/* Quailty */}
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                
                  <Quality>
                    {quality.map((x) => (
                      <Choice onClick={() => {
                        setLink(x.url)
                      }} key={quality.indexOf(x)}>{x.quality}</Choice>
                    ))}
                  </Quality>
                
              </Button>

              {/* Next */}
              <Button filled ref={temp_next}>
                <svg viewBox="0 0 24 24">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <line x1="19" y1="5" x2="19" y2="19"></line>
                </svg>
              </Button>

              {/* Episodes */}
              <Button ref={temp_episodes}>
                <svg viewBox="0 0 24 24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </Button>

              {/* Captions */}
              <Button filled rotate="true" ref={temp_captions}>
                <svg viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </Button>

              {/* Cast */}
              <Button ref={temp_cast}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
                  <line x1="2" y1="20" x2="2.01" y2="20"></line>
                </svg>
              </Button>

              {/* Fullscreen */}
              <Button
                ref={temp_fullscreen}
                onClick={() => {
                  video.requestFullscreen();
                }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </Button>
            </Controls>
          </ControlsContainer>
        )}
      </Container>
    </>
  );
}

export default Videooo;
