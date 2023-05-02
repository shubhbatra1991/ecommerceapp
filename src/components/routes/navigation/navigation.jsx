import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent  as CrwnLogo} from '../../../assets/crown.svg';

import CartIcon from "../../cart-icon/cart-icon.component";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

import { selectCurrentUser } from "../../../store/user/user.selector";
import { selectIsCarOpen } from "../../../store/cart/cart.selector";

import {  signOutStart } from '../../../store/user/user.action';


import './navigation.styles.scss';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser );
    const isCartOpen = useSelector(selectIsCarOpen);

    const signOutUser = () => dispatch(signOutStart());


    return(
        <Fragment>
            <div className='navigation'>
                <Link className ='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ?  (
                            <span className='nav-link' onClick={signOutUser}> 
                                Sign Out 
                            </span> 
                            ) : ( 
                                    <Link className='nav-link' to='/auth'>
                                            Sign In
                                    </Link>
                                )
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;