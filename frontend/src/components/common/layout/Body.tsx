import { Outlet } from 'react-router-dom';
import './Body.css';

function Body() {
    return(
        <div id="body">
            <h2>Body 영역</h2>
            <Outlet />
        </div>
    );
}

export default Body;