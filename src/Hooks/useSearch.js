import { useState, useEffect } from "react";

const getItem = async (q) => {

  
  try{
    const res = await fetch(q);
    const data = await res.json();
    return data
  }catch(err){
    console.error(err);
  }
}

export default function useSearch(link){
  const [currentPage, setCurrentPage] = useState(1)
  const  [hasNextPage, setHasNextPage] = useState(false)
  const [results, setResults] = useState([])

  const data = getItem(link)

  useEffect(() => {
    data.then((res) => {
      setCurrentPage(res.currentPage)
      setHasNextPage(res.hasNextPage)
      setResults(res.results)
    })
  }, [])
  

  return {currentPage, hasNextPage, results}
}