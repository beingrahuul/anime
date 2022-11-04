import CardList from '../CardList/CardList';



function Recent() {

  return (
    <CardList heading={"RECENT"} link={'https://api.consumet.org/anime/gogoanime/recent-episodes'}/>
  )
}

export default Recent;