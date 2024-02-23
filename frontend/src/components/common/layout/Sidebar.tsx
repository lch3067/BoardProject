import { Toolbar, Divider,List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import * as React from "react";
// import { Link } from "react-router-dom";
import './Sidebar.css';
import { Link } from "react-router-dom";

const Sidbar = () => {

    return(
        <div id="sidebar">
            <h2>Sidbar 영역</h2>
            <div>
                <List>
                    {['권한 관리', '권한별 메뉴 관리', '코드관리'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to={`/menu${index + 1}`}>
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