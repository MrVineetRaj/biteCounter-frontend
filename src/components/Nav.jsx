import { Link } from 'react-router-dom';
import style from '../component css/Header.module.css'
import { IoLogOutOutline } from "react-icons/io5";
import { useContext } from 'react';
import { Auth } from '../store/auth-details';



const Nav = ({ handleLogout }) => {
  const auth = useContext(Auth);
  const name = auth.user.name;
  return (
    <>
     <ul className={`${style.nav}`}>
       <li className="nav-item">
         <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
       </li>
       <li className="nav-item">
         <Link className="nav-link" to="/home/user-profile">User profile</Link>
       </li>
       <li className="nav-item">
         <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout <IoLogOutOutline /></button>
       </li>
     </ul>
    </>
  );
}

export default Nav;