import React, { useReducer } from 'react';
import CartContext from './CartContext';
import CartItem from './CartItem';

enum CartActionKind {
    ADD = 'ADD_CART_ITEM',
    REMOVE = 'REMOVE_CART_ITEM'
}
interface CartAction {
    type: CartActionKind,
    item: CartItem
}
interface CartState {
    items: CartItem[],
    totalAmount: number
}
const defaultCartState: CartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state: CartState, action: CartAction) => {
    if (action.type === 'ADD_CART_ITEM') {
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price
        //Trying to find if in the cart there is already an item of that type to update it or create a new one
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}

type ICartProviderProps = {
    children?: React.ReactNode
}
const CartProvider: React.FC<ICartProviderProps> = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item: CartItem) => {
        dispatchCartAction({ type: CartActionKind.ADD, item: item })
    }
    const removeItemFromCartHandler = (id: string) => {
        //dispatchCartAction({ type: CartActionKind.REMOVE, id: id })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider
