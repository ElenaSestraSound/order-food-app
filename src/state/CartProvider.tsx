import React, { useReducer } from 'react';
import CartContext from './CartContext';
import CartItem from './CartItem';

enum CartActionKind {
    ADD = 'ADD_CART_ITEM',
    REMOVE = 'REMOVE_CART_ITEM',
    CLEAR = 'REMOVE_ALL_OF_TYPE'
}
interface CartAction {
    type: CartActionKind,
    item: CartItem | string
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
    if (action.type === CartActionKind.ADD) {
        const newItem: CartItem = action.item as CartItem
        const updatedTotalAmount = state.totalAmount + newItem.amount * newItem.price
        //Trying to find if in the cart there is already an item of that type to update it or create a new one
        const existingCartItemIndex = state.items.findIndex(item => item.id === newItem.id)
        const existingCartItem = state.items[existingCartItemIndex]
        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + newItem.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(newItem)
        }
        return {
            items: updatedItems as CartItem[],
            totalAmount: updatedTotalAmount
        } as CartState

    }
    if (action.type === CartActionKind.REMOVE) {
        const removedItemId: string = action.item as string
        const existingCartItemIndex = state.items.findIndex(item => item.id === removedItemId)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price
        const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
        const updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        } as CartState

    }
    if (action.type === CartActionKind.CLEAR) {
        const removedItemId: string = action.item as string
        const existingCartItemIndex = state.items.findIndex(item => item.id === removedItemId)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingCartItem.price * existingCartItem.amount
        const updatedItems = state.items.filter(item => item.id !== removedItemId)

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        } as CartState
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
        dispatchCartAction({ type: CartActionKind.REMOVE, item: id })
    }

    const removeAllItemsOfTypeFromCartHandler = (id: string) => {
        dispatchCartAction({ type: CartActionKind.CLEAR, item: id })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        removeAllItemsOfType: removeAllItemsOfTypeFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider
