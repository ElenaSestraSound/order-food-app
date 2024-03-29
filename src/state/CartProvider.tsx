import React, { useReducer } from 'react';
import CartContext from './CartContext';
import CartItemModel from './CartItemModel';

enum CartActionKind {
    ADD = 'ADD_CART_ITEM',
    REMOVE = 'REMOVE_CART_ITEM',
    CLEAR = 'REMOVE_ALL_OF_TYPE',
    EMPTY = 'EMPTY_CART'
}
interface CartAction {
    type: CartActionKind,
    item?: CartItemModel | string
}
interface CartState {
    items: CartItemModel[],
    totalAmount: number
}
const defaultCartState: CartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
    if (action.type === CartActionKind.ADD) {
        const newItem: CartItemModel = action.item as CartItemModel
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
            items: updatedItems as CartItemModel[],
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

    if (action.type == CartActionKind.EMPTY) {
        return defaultCartState
    }
    return defaultCartState
}

type ICartProviderProps = {
    children?: React.ReactNode
}
const CartProvider: React.FC<ICartProviderProps> = ({ children }) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item: CartItemModel) => {
        dispatchCartAction({ type: CartActionKind.ADD, item: item })
    }
    const removeItemFromCartHandler = (id: string) => {
        dispatchCartAction({ type: CartActionKind.REMOVE, item: id })
    }

    const removeAllItemsOfTypeFromCartHandler = (id: string) => {
        dispatchCartAction({ type: CartActionKind.CLEAR, item: id })
    }

    const emptyCartHandler = () => {
        dispatchCartAction({ type: CartActionKind.EMPTY })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        removeAllItemsOfType: removeAllItemsOfTypeFromCartHandler,
        emptyCart: emptyCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider
