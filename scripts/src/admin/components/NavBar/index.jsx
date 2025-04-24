import Style from './style.module.css';

/**
 * Main navbar component
 */
const NavBar = ({navList, activeMenu, onClick}) => {
    return (
        <div className={Style.container}>
            {
                navList.map(({key, label}) => {
                    return (
                        <div
                            key={key}
                            className={`
                                ${Style.menu}
                                ${activeMenu === key ? Style.activeMenu : '' }
                            `}
                            onClick={() => {onClick(key)}}
                        >
                            <span>{label}</span>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default NavBar;
