// components
import CartItem from "./CartItem";
import RedirectButton from "./RedirectButton";

// context
import { useCartContext } from "../context/CartContext";

const Checkout = () => {
    // context
    const Cart = useCartContext();
    const currentCart = Cart.getCart();

    // button
    const onClick = () => {
        console.log("purchased!");
    }

    // number formatting

    let dollar = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'CAD' 
    });

    return (
        <div className="flex items-center justify-center flex-row w-screen h-screen"> 
            <div className="flex flex-col items-start w-2/3 h-3/4 min-w-[25rem] min-h-[20rem] shadow-lg p-20 justify-between">
                <div>
                    <span className="text-2xl font-bold text-indigo-600">Ready to checkout?<p className="text-black"></p></span>
                    <p className="mb-8 text-xs">Total is calculated below.</p>
                </div>
                <div className="w-[30rem] h-full min-h-20 max-h-[66%] flex flex-col gap-3">
                    {currentCart.map(item => {
                        return (
                            <CartItem name={item.name} quantity={item.quantity} src={item.src} id={item.id} price={item.price}/>
                        )
                    })}
                </div>
                <hr className="mb-2 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-100 dark:via-neutral-400" />
                <div className="flex flex-col w-full h-[5rem] mb-7">
                    <label className="font-semibold text-sm">SUBTOTAL: <span className="text-indigo-600">{dollar.format(Cart.subTotal)}</span></label>
                    <label className="font-semibold text-sm">TAX: <span className="text-indigo-600">{dollar.format(Cart.subTotal*0.13)}</span></label>
                    <label className="font-semibold text-sm">SHIPPING: <span className="text-indigo-600">{dollar.format(Cart.subTotal*0.20)}</span></label>
                    <label className="font-bold text-xl">TOTAL: <span className="text-indigo-600">{dollar.format(Cart.subTotal*1.33)}</span></label>
                </div>
                <RedirectButton onClick={onClick}>Confirm Order</RedirectButton>
            </div>
        </div>
    );
}

export default Checkout;