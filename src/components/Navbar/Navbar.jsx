import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import serch_icon from "../../assets/search.png";
import upoload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notify_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";

function Navbar({setSidebar}) {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img className="menu-icon" onClick={()=>setSidebar(pre => pre===false?true:false)} src={menu_icon} alt="" />
        <Link to={'/'}><img className="logo" src={logo} alt="" /></Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search [Designed by Himadri]" />
          <img src={serch_icon} alt="" />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={upoload_icon} alt="" />
        <img src={more_icon} alt="" />
        <img src={notify_icon} alt="" />
        <img src={profile_icon} className="user-icon" alt="" />
      </div>
    </nav>
  );
}

export default Navbar;
