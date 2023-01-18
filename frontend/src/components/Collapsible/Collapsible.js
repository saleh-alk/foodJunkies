import { useState } from 'react';
import './Collapsible.css';

const Collapsible = () => {
    const [open, setOpen] = useState(false);


    const toggle = () => {
        setOpen(!open);
      };
      
    return (
        <div>
            {/* <button onClick={toggle}>toggle</button> */}
            <div onClick={toggle} className='collapsible-toggle-button'>toggle</div>
            {open && (
                <div className="toggle">
                    <h4>toggle</h4>
                </div>
            )}
        </div>
    )
}

export default Collapsible;