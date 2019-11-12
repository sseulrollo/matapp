import React, {useState} from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import { Link } from 'react-router-dom'

const BottomNav = ({props, routeChange}) => {

    const [value, setValue] = useState('/');

    const handleChange = (e, newValue) => {
        setValue(newValue);
        routeChange(newValue)
    }

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels>
            <BottomNavigationAction label="Home" value="Home" 
            icon={<HomeIcon />} component={Link} to="/" />
            <BottomNavigationAction label="이동이력" value="이동이력" 
            icon={<HistoryIcon />} component={Link} to="/isearch" />
            <BottomNavigationAction label="재고이동" value="재고이동" 
            icon={<ShoppingCartIcon />} component={Link} to="/itrans" />
        </BottomNavigation>
    )
}

export default BottomNav;