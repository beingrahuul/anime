import './Home.scss'


//Components
import Navbar from '../../Components/Navbar/Navbar'
import TopAiring from '../../Components/TopAiring/TopAiring'
import Recent from '../../Components/Recent/Recent'
import Footer from '../../Components/Footer/Footer'

function Home() {


  return (
    <div className='home'>
      <Navbar />
      <TopAiring />
      <Recent />
      <Footer />
    </div>
  )
}

export default Home