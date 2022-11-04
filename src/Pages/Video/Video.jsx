import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from "react";
import Hls from "hls.js";


// Styled Components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
`;

const ControlsContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(rgba(0,0,0, 0), rgb(0, 0, 0, 0.9));
  padding: 1vw;
  gap: 10px;
`

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

  &:hover{
    opacity: 1;
    transform: scale(1.3);
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

  &::-webkit-slider-thumb{
    -webkit-appearance: none;
    background-color: #e74c3c;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: .3s ease-in-out;

    &:hover{
      background-color: white;
      border: 2px solid #e74c3c;
    }

    &:active{
      transform: scale(1.15);
    }
  }
`

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
`

const ProgressBar = styled.div`
  width: 95%;
  height: 1vw;
  max-height: 5px;
  background-color: #5b5b5b;
  display: flex;
  align-items: center;
`

const WatchedBar = styled.div`
  background-color: #e31221;
  height: 130%;
  width: 20%;
  display: inline-block;
`

const Playhead = styled.div`
  background-color: #e31221;
  height: 3vw;
  width: 3vw;
  max-height: 20px;
  max-width: 20px;
  border-radius: 50%;
  display: inline-block;

`

const Time = styled.div`
  color: white;
  margin: 1vw;
`

function Video() {

  // temp Refrences
  const temp_player = useRef()
  const temp_video = useRef()
  const temp_play = useRef()
  const temp_rewind = useRef()
  const temp_forward = useRef()
  const temp_volume = useRef()
  const temp_volumePicker = useRef()
  const temp_next = useRef()
  const temp_episodes = useRef()
  const temp_captions = useRef()
  const temp_cast = useRef()
  const temp_fullscreen = useRef()
  
  // Refs
  const player = temp_video.current
  const video = temp_video.current
  const play = temp_play.current
  const rewind = temp_rewind.current
  const forward = temp_forward.current
  const volume = temp_volume.current
  const volumePicker = temp_volumePicker.current
  const next = temp_next.current
  const episodes = temp_episodes.current
  const captions = temp_captions.current
  const cast = temp_cast.current
  const fullscreen = temp_fullscreen.current


  //States
  const [quality, setQuality] = useState([])
  const {ep_id}  = useParams();
  const [link, setLink]= useState('')

  const getData = async (abort) => {
    const link = `https://api.consumet.org/anime/gogoanime/watch/${ep_id}`
    const api = await fetch(link, {signal : abort.signal})
    const ep_data = await api.json();
    setQuality(ep_data.sources);
    setLink(ep_data.sources[0]['url']);
  }


  useEffect(() => {
    const abortCont = new AbortController()
    getData(abortCont)

    return () =>{ 
      abortCont.abort()
    };
  }, [])

  // HLS PLAYER
  if(Hls.isSupported() && video){
    const hls = new Hls() 
    hls.loadSource(link)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play()
    })
  }


  const handleVolumePicker = ()=> {
    video.muted = !video.muted
  }

  const handleVolume = (e) => {
    video.volume = e.target.value
  }
  

  return (
    <Container ref={temp_player}>

      <VideoPlayer 
        ref={temp_video}
      ></VideoPlayer>

      <ControlsContainer>

        <ProgressControl>
          <ProgressBar>
            <WatchedBar>
            
            </WatchedBar>
            <Playhead>

            </Playhead>
          </ProgressBar>

          <Time>
            42:00
          </Time>
          
        </ProgressControl>

        <Controls>

          {/* Play/Pause */}
          <Button filled ref={temp_play} onClick={() => {
              if (video.paused){
                video.play();
              }else{
                video.pause();
              }
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </Button>

          {/* rewind */}
          <Button filled ref={temp_rewind} onClick={() => {video.currentTime -= 10}}>
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
          <Button filled ref={temp_forward} onClick={() => {video.currentTime += 10}}>
            <svg viewBox="0 0 24 24"  >
              <polygon points="13 19 22 12 13 5 13 19"></polygon>
              <polygon points="2 19 11 12 2 5 2 19"></polygon>
            </svg>
          </Button>

          {/* Volume */}
          <Button filled ref={temp_volume} onClick={handleVolumePicker}>
            <svg viewBox="0 0 24 24"  >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" fill="none"></path>
            </svg>
          </Button>

          {/* volume picker */}
          <Volume 
            ref={temp_volumePicker}  
            type={'range'} 
            min="0" 
            max="1"
            step='0.1'
            defaultValue='1'
            onChange={handleVolume}
          />
          
          {console.log(quality)}
          <Title>
            <Series>Beingrahuul: </Series>
            <Episode>Episode 1</Episode>
          </Title>

          {/* Help */}
          <Button>
            <svg viewBox="0 0 24 24"  >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </Button>

          {/* Next */}
          <Button filled ref={temp_next}>
            <svg
              viewBox="0 0 24 24"
            >
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
            <svg viewBox="0 0 24 24"  >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>

          {/* Cast */}
          <Button ref={temp_cast}>
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path>
              <line x1="2" y1="20" x2="2.01" y2="20"></line>
            </svg>
          </Button>

          {/* Fullscreen */}
          <Button ref={temp_fullscreen} onClick={() => {
            player.requestFullscreen()
          }}>
            <svg viewBox="0 0 24 24"  >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
          </Button>
        </Controls>
      </ControlsContainer>
    </Container>
  );
}

export default Video;
