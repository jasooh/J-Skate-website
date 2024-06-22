import { useState } from 'react';
// components
import NavigationButton from './NavigationButton';

// context
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';

import RedirectButton from './RedirectButton';
import Modal from './Modal';

const NavigationBar = () => {
    // modal
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    // context objects
    const Auth = useAuthContext();
    let buttonText = Auth.isLoggedIn ? "Account" : "Log in"
    let link = Auth.isLoggedIn ? "/account" : "/login"

    // buttons
    const NavButtons = [
        { link: "/", text: "Home" },
        { link: link, text: buttonText }
    ]

    // cart button
    const onClick = () => {
        open();
    }

    return (
        <div className="fixed w-full h-20 pr-10 bg-gray-100 flex justify-between items-center z-10">
            <div className="flex gap-14 pl-10">
                {NavButtons.map(button => {
                    return (
                        <NavigationButton key={button.text} link={button.link}>{button.text}</NavigationButton>
                    );
                })}
            </div>
            <RedirectButton onClick={onClick}>Cart</RedirectButton>
            <Modal isOpen={isOpen} onClose={close}/>
        </div>
    );
}

export default NavigationBar;