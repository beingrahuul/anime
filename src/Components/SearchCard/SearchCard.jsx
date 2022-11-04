import './SearchCard.scss'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const MovieCard = styled.div`
  position: relative;
  display: flex;
  width: 800px;
  height: 350px;
  margin: 25px auto; 
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  &:hover{
    transform: scale(1.02);
    transition: all 0.4s;
  }
`

const InfoSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
  z-index: 2;
  border-radius: 10px;
  background: linear-gradient(to right, #0d0d0c 50%, transparent 100%);

`

const MovieHeader = styled.div`
  position: relative;
  display: flex;
  padding: 25px;
  height: 40%;
  width: 60%;
`



const Locandina = styled.img`
  position: relative;
  float: left;
  margin-right: 20px;
  height: 180px;
  width: 150px;
  object-fit: cover;
  box-shadow: 0 0 20px -10px rgba(0,0,0,0.5);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const MoiveDesc = styled.div`
  padding: 25px;
  height: 50%;
  width: 50%;

`

const Text = styled.p`
  color: #cfd6e1;
`

const Back = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  right: 0;
  border-radius: 11px;
`

const BackImage = styled.img`
  position: absolute;
  width: 50%;
  height: 100%;
  object-fit: cover;
  right: 0;
  border-radius: 11px;
  background: url(${props => props.url});
`

const Minutes = styled.span`
  display: inline-block;
  margin-top: 10px;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(255,255,255,0.13);
`

const Type = styled.p`
  display: inline-block;
  color: #cee4fd;
  margin: 0;
  font-size: 18px;
`

const Title = styled.h1`
  color: #fff;
  font-weight: 400;
  margin: 0;
`

const Released = styled.h4`
  color: #9ac7fa;
  margin: 10px 0px;
  font-weight: 400; 
`

function SearchCard({anime}) {

  const {id, image, releaseDate, subOrDub, title} = anime
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`../anime/${id}`)
  }

  return (
    <MovieCard onClick={handleClick}>
      <InfoSection>

        <MovieHeader>
          <Locandina src={image}/>
          <Container>
            {title.length < 40 && <Title>{title}</Title>}
            {title.length > 40 && <Title>{title.substring(0, 40).concat('...')}</Title>}
            <Released>{releaseDate}</Released>
            <Type>{subOrDub}</Type>
          </Container>
        </MovieHeader>

        <MoiveDesc>
          <Text>
            Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for. 
          </Text>
        </MoiveDesc>
      </InfoSection>
      <Back>
        <BackImage src={image}/>
      </Back>
    </MovieCard>
  )
}

export default SearchCard