import React, { useState } from 'react';

import Title from './components/Title';
import NavBar from './components/NavBar';

import FlowBuilder from './pages/FlowBuilder';
import SmartAnswer from './pages/SmartAnswer';
import Preview from './pages/Preview';


/**
 * Navlist information
 */
const navList = [
    {
        key: 'flowBuilder',
        label: 'Flow Builder'
    },
    {
        key: 'smartAnswers',
        label: 'Smart Answers'
    },
    {
        key: 'preview',
        label: 'Preview'
    }
]

/**
 * Main layout component
 */
const Layout = () => {

    // State varaible for active page
    const [ activeMenu, setActiveMenu ] = useState(navList[0].key);
    
    return (
        <div className='container'>
            {/* Main title components */}
            <Title/>

            {/* Main navbar component */}
            <NavBar
                navList={navList}
                activeMenu={activeMenu}
                onClick={(menu) => setActiveMenu(menu)}
            />

            <div className='pageContainer'>
                { activeMenu == 'flowBuilder' && <FlowBuilder/> }
                { activeMenu == 'smartAnswers' && <SmartAnswer/> }
                { activeMenu == 'preview' && <Preview/> }
            </div>
        </div>
    )
}

export default Layout;
