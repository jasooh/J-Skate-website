// hooks
import { useNavigate } from 'react-router-dom';

// components
import RedirectButton from './RedirectButton';

// icons
import { VscChevronRight } from 'react-icons/vsc';

// context 
import { useCartContext } from '../context/CartContext';
import CartItem from './CartItem';

interface ModalProps {
    isOpen: boolean,
    onClose: () => void
}

const Modal = ({isOpen, onClose}:ModalProps) => {
    // checkout button
    const navigate = useNavigate();
    const onClick = () => {navigate("/checkout")}

    // context
    const Cart = useCartContext();
    const currentCart = Cart.getCart();

    // modal logic
    if (isOpen == false) return null;

    return (
        <div className="w-screen h-screen fixed flex items-end justify-end inset-0 m-auto">
            <div className="w-1/3 h-screen max-w-[30rem] rounded-lg bg-gray-100 z-20 p-10">
                <div className="flex w-full h-full">
                    <button className="w-[3rem] h-full mr-3" onClick={onClose}>
                        <div className="w-full h-full flex justify-center items-center hover:translate-x-3 hover:scale-110 duration-300">
                            <VscChevronRight size="2rem" />
                        </div>
                    </button>
                    <div className="flex flex-col  w-full h-full">
                        <div>
                            <span className="text-2xl font-bold text-indigo-600">Your cart</span>
                            <p className="mb-8 text-xs">Overview</p>
                        </div>
                        <div className="w-full h-full flex flex-col gap-5">
                            {currentCart.map(item => {
                                return (
                                    <CartItem name={item.name} quantity={item.quantity} src={item.src} id={item.id}/>
                                )
                            })}
                        </div>
                        <RedirectButton onClick={onClick}>Checkout</RedirectButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;