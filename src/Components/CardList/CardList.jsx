import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

//Components
import Card from '../Card/Card';

//Hooks
import useWindowDimensions from '../../Hooks/useWindowDimensions ';

//Styled
const Wrapper = styled.div`
  margin: 0px 10px;
`

const Heading = styled.h1`
  margin: 10px 0px 0px 0px;
`

const Container =styled.div`
  height: 500px;
  width: 320px;
  display: flex;
  align-items: center;
`

function CardList({heading, link}) {

  
  const { width } = useWindowDimensions();
  const cardWidth = 320;
  let ratio = Math.floor(width/cardWidth)
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const api = await fetch(link)
    const temp_data = await api.json();
    setData(temp_data.results);
  }

  return (
    <Wrapper>
      <Heading>{heading}</Heading>
        <Splide options={{
          perPage:ratio,
          arrows: false,
          pagination: false,
        }}>
          {data.map((anime) => (
            <SplideSlide key={data.indexOf(anime)}>
              <Container>
                <Card anime={anime} />
              </Container>
            </SplideSlide>
          ))}
        </Splide>
    </Wrapper>
  )
}

export default CardList