// context
import { useCartContext } from "../context/CartContext"

interface CartItemProps {
    name: string,
    quantity: number,
    src: string,
    id: number
}

const CartItem = ({name, quantity, src, id}:CartItemProps) => {
    // context
    const Cart = useCartContext();

    // button logic
    const onClickSubtract = (id: number) => {
        if (Cart.getItemQuantity(id)-1 <= 0) {
            Cart.removeItemWithId(id);
        } else {
            Cart.subtractItemWithId(id);
        }
    }
    const onClickAdd = (id: number, name: string, src: string) => Cart.addItemWithId(id, name, src);

    return (
        <div className="w-full h-[6rem] flex flex-row items-center rounded-xl hover:bg-gray-200 duration-300">
            <img src={src} className="rounded-xl object-cover w-[8rem] h-full max-h-[5rem] mr-10" />
            <div className="flex flex-col">
                <span className="font-bold tracking-tighter leading-3">{name}</span>
                <span>Quantity: {quantity}</span>
                <div className="flex mt-1">
                    <button className="flex items-center justify-center bg-indigo-600 border border-indigo-600 text-white w-8 h-8 rounded-l-xl hover:bg-inherit hover:text-indigo-600 duration-300" onClick={() => onClickSubtract(id)}><div>-</div></button>
                    <button className="flex items-center justify-center bg-indigo-600 border border-indigo-600 text-white w-8 h-8 rounded-r-xl hover:bg-inherit hover:text-indigo-600 duration-300" onClick={() => onClickAdd(id, name, src)}><div>+</div></button>
                </div>
            </div>
        </div>
    );
}

export default CartItem