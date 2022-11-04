import useSearch from '../../Hooks/useSearch'
import { useParams } from 'react-router-dom';
import './Search.scss'
import SearchCard from '../../Components/SearchCard/SearchCard';
import Navbar from '../../Components/Navbar/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';


//Components

const NextPage = styled.div`
  
`



function Search() {
  const { query } = useParams();
  const {currentPage, hasNextPage, results} = useSearch(`https://api.consumet.org/anime/gogoanime/${query}`)
  
  return (
    <>
      <Navbar />
      <div>
        {results.map((result) => (
          <SearchCard key={results.indexOf(result)} anime={result}/>
        ))}
      </div>
    </>
  )
}

export default Search