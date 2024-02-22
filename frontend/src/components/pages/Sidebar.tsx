import { Toolbar, Divider,List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import * as React from "react";
// import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidbar = () => {

    return(
        <div id="sidebar">
            <h2>Sidbar 영역</h2>
            <div>
                <List>
                    {['권한 관리', '권한별 메뉴 관리', '코드관리'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            {/* <Link></Link> */}
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                </div>
        </div>
    );
}

export default Sidbar;