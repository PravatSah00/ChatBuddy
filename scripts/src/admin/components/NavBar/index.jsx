import { Link, useLocation  } from "react-router-dom";
import Style from './style.module.css';

/**
 * Main navbar component
 */
const NavBar = () => {
    
    // Get the current location
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className={Style.container}>
            <Link className={`${Style.menu} ${ pathname == '/' || pathname == '/flowbuilder' ? Style.activeMenu : '' }`} to="/flowbuilder">Flow Builder</Link>
            <Link className={`${Style.menu} ${ pathname == '/smartanswer' ? Style.activeMenu : '' }`} to="/smartanswer">Smart Answer</Link>
            <Link className={`${Style.menu} ${ pathname == '/preview' ? Style.activeMenu : '' }`} to="/preview">Preview</Link>
        </div>
    )
}

export default NavBar;
