import CardList from '../CardList/CardList';



function TopAiring() {

  return (
    <CardList heading={"TOP AIRING"} link={`https://api.consumet.org/anime/gogoanime/top-airing`}/>
  )
}

export default TopAiring;