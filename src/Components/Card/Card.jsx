import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


//Styled Components

const Container = styled.div`
  height: 450px;
  width: 300px;
  margin-left: 10px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: yellow;
  &:hover{
    transform: scale(1.03);
  }
`

const Image = styled.img`
  width: 100%;
  height: 85%;
  object-fit: cover;
`

const Title = styled.p`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
`


function Card({anime}) {
  const navigate = useNavigate()

  

  const handleClick = () => {
    navigate(`./anime/${anime.id}`)
  }
  
  return (
      <Container onClick={handleClick}>
        <Image src={anime.image} alt="" />
        <Title>{anime.title}</Title>
      </Container>
  )
}

export default Card