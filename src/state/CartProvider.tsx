import React, { useReducer } from 'react';
import CartContext from './CartContext';
import CartItem from './CartItem';

export interface ICartProviderProps {
    children?: JSX.Element | JSX.Element[]
}
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
    if (action.type == 'ADD_CART_ITEM') {
        const updatedItems = state.items.concat(action.item)
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}
const CartProvider: React.FC = (props: ICartProviderProps) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item: CartItem) => {
        dispatchCartAction({ type: CartActionKind.ADD, item: item })
    }
    const removeItemFromCartHandler = (id: string) => { }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider
