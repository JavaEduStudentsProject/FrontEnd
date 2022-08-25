import React from "react";
import img from "../../images/img_1.png";
import DropDownMenu from "./DropDownMenu";
import SearchField from "./SearchField";
import {styled} from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatar1 from '../../images/avatar.jpg'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'


export default function Header(props) {
    const {countProductInBasket} = props;
    console.log(countProductInBasket);

    if (countProductInBasket != 0) {
        console.log("Работает")
    }

    const StyledBadge = styled(Badge)(({theme}) => ({
    // {console.log("Test")}
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
        }
    ));


    return (
        <header>
            <nav className="nav-panel">
                <img className="nav-img" src={img} onClick={() => {
                    window.location.assign("/")
                }}/>
                <DropDownMenu/>

                <SearchField handleChange={props.handleChange} searchField={props.searchField}/>
                <div className="userIcons">
                    <Stack direction="row" spacing={2}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                        >
                            <Avatar alt="Корзина" href="/basket"
                                    src='https://thumbs.dreamstime.com/b/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D0%BB%D0%B0-%D0%BB%D0%B8%D0%BD%D0%B8%D1%8E-%D0%BF%D0%B8%D0%BA%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%83-171571446.jpg'/>
                            <span className="count-products-in-basket">{countProductInBasket}</span>
                        </StyledBadge>
                        {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>*/}
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>


                        <Button className="product-button" variant="primary">
                            <Link className="link-button" to="/basket" >Корзина</Link>
                        </Button>


                    </Stack>

                </div>

            </nav>
            <nav className="nav-list">
                <ul>Крупные</ul>
                <ul>категории</ul>
                <ul>первого</ul>
                <ul>слоя</ul>
                <ul>вложенности</ul>
                <a href="http://localhost:3000/">Все продукты</a>
            </nav>
        </header>
    )
}
