import { ReactNode, createContext, useContext, useState } from "react";

// cart data
interface CartItem {
    id: number,
    quantity: number
}

interface CartProps {
    getItemId: (id: number) => number,
    addItemWithId: (id: number) => void,
    subtractItemWithId: (id: number) => void,
    removeItemWithId: (id: number) => void,
    getCart: () => void
};

const Cart = createContext({} as CartProps);

const CartProvider = ({children}:{children: ReactNode}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // methods for cart
    const getItemId = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const addItemWithId = (id: number) => {
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
                return [...currentCart, { id, quantity: 1 }]
            };
        });
    }

    const subtractItemWithId = (id: number) => {
        setCartItems(currentCart => {
            if (currentCart.find(item => item.id === id)) {
                return currentCart.map(item => {
                    if (item.id === id && item.quantity > 0) {
                        return { ...item, quantity: item.quantity - 1 };
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
        <Cart.Provider value={{ getItemId, addItemWithId, subtractItemWithId, removeItemWithId, getCart }}>
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