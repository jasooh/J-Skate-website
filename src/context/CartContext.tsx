import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

// cart data
interface CartItem {
    id: number,
    name: string,
    quantity: number,
    src: string,
    price: number
}

interface CartProps {
    getItemQuantity: (id: number) => number,
    addItemWithId: (id: number, name: string, src: string, price: number) => void,
    subtractItemWithId: (id: number, price: number) => void,
    removeItemWithId: (id: number) => void,
    getCart: () => CartItem[],
    subTotal: number,
    setSubTotal: Dispatch<SetStateAction<number>>
};

const Cart = createContext({} as CartProps);

const CartProvider = ({children}:{children: ReactNode}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subTotal, setSubTotal] = useState<number>(0);

    // methods for cart
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const addItemWithId = (id: number, name: string, src: string, price: number) => {
        setSubTotal(currentTotal => {return currentTotal + price});
        setCartItems(currentCart => {
            if (currentCart.find(item => item.id === id)) {
                return currentCart.map(item => {
                    if (item.id === id) {
                        // increase the value of existing items and adjust price value in the cart object
                        return { ...item, quantity: item.quantity + 1 }; 
                    } else {
                        // add any items that are not matching the id back to this new array
                        return item;
                    };
                })
            } else {
                // create a new item if it was not found in the array
                return [...currentCart, { id, name: name, quantity: 1, src: src, price: price}]
            };
        });
    }

    const subtractItemWithId = (id: number, price: number) => {
        setSubTotal(currentTotal => {return currentTotal - price});
        setCartItems(currentCart => {
            if (currentCart.find(item => item.id === id)) {
                return currentCart.map(item => {
                    if (item.id === id) {
                        return { ...item, name: item.name, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    };
                });
            } else {
                return currentCart;
            }
        });
    }

    const removeItemWithId = (id: number) => {
        setCartItems(currentCart => {
            // return an array with all items with an id that is not equal to the given id
            return currentCart.filter(item => item.id !== id);
        });
    };

    const getCart = () => {return cartItems;}

    return (
        <Cart.Provider value={{ getItemQuantity, addItemWithId, subtractItemWithId, removeItemWithId, getCart, subTotal, setSubTotal }}>
            { children }
        </Cart.Provider>
    )
}

// make hook that returns the cart object
const useCartContext = () => {
    const context = useContext(Cart);
    return context
};

export { CartProvider, useCartContext };