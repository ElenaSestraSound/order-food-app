import React from "react";
import CartItem from "./CartItem";

interface AppContextInterface {
    items: CartItem[],
    totalAmount: number,
    addItem: (item: CartItem) => void,
    removeItem: (id: string) => void,
    removeAllItemsOfType: (id: string) => void,
}

const CartContext = React.createContext<AppContextInterface>(
    {
        items: [],
        totalAmount: 0,
        addItem: () => { },
        removeItem: () => { },
        removeAllItemsOfType: () => { }
    }
)

export default CartContext
