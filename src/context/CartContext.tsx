import { ReactNode, createContext, useContext, useState } from "react";

// cart data
interface CartItem {
    id: number,
    name: string,
    quantity: number,
    src: string
}

interface CartProps {
    getItemQuantity: (id: number) => number,
    addItemWithId: (id: number, name: string, src: string) => void,
    subtractItemWithId: (id: number) => void,
    removeItemWithId: (id: number) => void,
    getCart: () => CartItem[]
};

const Cart = createContext({} as CartProps);

const CartProvider = ({children}:{children: ReactNode}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // methods for cart
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const addItemWithId = (id: number, name: string, src: string) => {
        setCartItems(currentCart => {
            if (currentCart.find(item => item.id === id)) {
                return currentCart.map(item => {
                    if (item.id === id) {
                        // increase the value of existing items
                        return { ...item, quantity: item.quantity + 1 }; 
                    } else {
                        // add any items that are not matching the id back to this new array
                        return item;
                    };
                })
            } else {
                // create a new item if it was not found in the array
                return [...currentCart, { id, name: name, quantity: 1, src: src}]
            };
        });
    }

    const subtractItemWithId = (id: number) => {
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
        <Cart.Provider value={{ getItemQuantity, addItemWithId, subtractItemWithId, removeItemWithId, getCart }}>
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