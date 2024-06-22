// context
import { useCartContext } from "../context/CartContext"

interface CartItemProps {
    name: string,
    quantity: number,
    src: string,
    id: number,
    price: number
}

const CartItem = ({name, quantity, src, id, price}:CartItemProps) => {
    // context
    const Cart = useCartContext();

    // button logic
    const onClickSubtract = (id: number) => {
        if (Cart.getItemQuantity(id)-1 <= 0) {
            Cart.removeItemWithId(id);
            Cart.setSubTotal(currentTotal => {return currentTotal - price});
        } else {
            Cart.subtractItemWithId(id, price);
        }
    }
    const onClickAdd = (id: number, name: string, src: string, price: number) => Cart.addItemWithId(id, name, src, price);

    return (
        <div className="w-full h-[6rem] flex flex-row items-center rounded-xl hover:bg-gray-200 duration-300 pl-2">
            <img src={src} className="rounded-xl object-cover w-[8rem] h-full max-h-[5rem] mr-10" />
            <div className="flex flex-col w-[12rem]">
                <span className="font-bold leading-3">{name}</span>
                <p className="text-sm">${price}.00</p>
                <span>Quantity: {quantity}</span>
                <div className="flex mt-1">
                    <button className="flex items-center justify-center bg-indigo-600 border border-indigo-600 text-white w-6 h-6 rounded-l-xl hover:bg-inherit hover:text-indigo-600 duration-300" onClick={() => onClickSubtract(id)}><div>-</div></button>
                    <button className="flex items-center justify-center bg-indigo-600 border border-indigo-600 text-white w-6 h-6 rounded-r-xl hover:bg-inherit hover:text-indigo-600 duration-300" onClick={() => onClickAdd(id, name, src, price)}><div>+</div></button>
                </div>
            </div>
        </div>
    );
}

export default CartItem