import React, {useState} from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import { Link } from 'react-router-dom'

const BottomNav = (props) => {

    const [value, setValue] = useState('/');

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels>
            <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction label="재고이동" value="/imove" icon={<ShoppingCartIcon />} component={Link} to="/imove" />
            <BottomNavigationAction label="이동이력" value="/isearch" icon={<HistoryIcon />} component={Link} to="/isearch" />
        </BottomNavigation>
    )
}

export default BottomNav;