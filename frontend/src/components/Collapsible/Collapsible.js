import { useState } from 'react';
import './Collapsible.css';

const Collapsible = ({ toggleSidebar }) => {
    return (
        <div>
            <div onClick={()=>toggleSidebar()} className='collapsible-toggle-button'>toggle</div>
        </div>
    )
}

export default Collapsible;