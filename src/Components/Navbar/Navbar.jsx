import { Link, useNavigate } from 'react-router-dom'
import './Navbar.scss'


function Navbar() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    if(e.key === "Enter"){
      navigate(`../search/${e.target.value}`);
    }
  }
  return (
    <div className='navbar'>
      <div className="left">
        <span className="logo">
          <Link to="/">Beingrahuul</Link>
        </span>
      </div>
      <div className="center">
        <input 
          placeholder='Search'
          onKeyPress={handleSubmit}

        />
      </div>
      <div className="right">
        <span>Your list</span>
        <img src="https://images.unsplash.com/photo-1665589566927-ef1b7540c535?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="" />
      </div>
    </div>
  )
}

export default Navbar
