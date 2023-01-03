import React from "react";
import CartItemModel from "./CartItemModel";

interface AppContextInterface {
    items: CartItemModel[],
    totalAmount: number,
    addItem: (item: CartItemModel) => void,
    removeItem: (id: string) => void,
    removeAllItemsOfType: (id: string) => void,
    emptyCart: () => void
}

const CartContext = React.createContext<AppContextInterface>(
    {
        items: [],
        totalAmount: 0,
        addItem: () => { },
        removeItem: () => { },
        removeAllItemsOfType: () => { },
        emptyCart: () => { }
    }
)

export default CartContext
