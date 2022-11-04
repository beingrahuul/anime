import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

//Components
import Navbar from '../../Components/Navbar/Navbar'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Top = styled.div`
  display: flex;
  margin: 0px 10vw;
  gap: 20px;
`

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 300px;
`

const Image = styled.img`
  height: 80%;
  width: 300px;
  object-fit: cover;
  border: 5px solid purple;
  transition: all 0.4s ease-in-out;
  &:hover{
    border: 5px solid lightpink;
  }
`
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  gap: 20px;
  color: white;
`

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 40px;
  margin: 0;
`

const Desc = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
`

const GenreContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Genre = styled.div`
  border: 1px solid black;
  padding: 4px;
  background-color: black;

`
const Status = styled.div`
  border: 1px solid black;
  padding: 8px;
  background-color: ${props => props.BgColor || "palevioletred"};
  color: black;
  max-width: fit-content;
`

const Bottom = styled.div`
  display: flex;
  margin: 0px 10vw;
  gap: 20px;
  flex-direction: column;
`

const EpisodesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 50px;
` 

const Episode = styled.div`
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  height: 30px;
  width: 120px;
  padding: 10px;
  background-color: plum;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover{
    border: 2px solid white;
    background-color: lightcoral;
    transform: scale(1.1);
  }
`



function Anime() {
  
  const {anime}  = useParams();
  const navigate = useNavigate()
  const [animeData, setAnimeData] = useState([])
  const [genres, setGenres] = useState([])
  const [episodes, setepisodes] = useState([])
  const getData = async (abort) => {
    const api = await fetch(
      `https://api.consumet.org/anime/gogoanime/info/${anime}`, 
      {signal : abort.signal}
    )

    const temp_data = await api.json();
    setAnimeData(temp_data);
    setGenres(temp_data.genres)
    setepisodes(temp_data.episodes)
  }

  useEffect(() => {
    const abortCont = new AbortController()
    getData(abortCont)

    return () => abortCont.abort();
    
  }, [])
 
  return (
    <>
      <Navbar />
      <Container>
        <Top>
          <ImageContainer>
            <Image src={animeData.image}/>
          </ImageContainer> 
          <InfoContainer>
            <Title>{animeData.title}</Title>
            <Desc>{animeData.description}</Desc>
            <GenreContainer>
              Genres:
              {genres.map((x) => (
                <Genre key={genres.indexOf(x)}>{x}</Genre>
              ))}
            </GenreContainer>
            <Status BgColor='lightyellow'>{animeData.status}</Status>
            <Desc>Total Episodes: {animeData.totalEpisodes}</Desc>
          </InfoContainer>
        </Top>
        <Bottom>
          <Title>Episodes</Title>
          <EpisodesContainer>
          {episodes.map((x) => (
                <Episode key={episodes.indexOf(x)} onClick={() =>  navigate(`../videooo/${x.id}`)}>Episode {x.number}</Episode>
          ))}
          </EpisodesContainer>
        </Bottom>
      </Container>
    </>
  )
}

export default Anime