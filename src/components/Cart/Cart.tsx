import { Text, Box, Button, Divider, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spacer, UnorderedList } from '@chakra-ui/react';
import React, { useContext } from 'react';
import CartToggleButton from './CartToggleButton';

import CartContext from '../../state/CartContext';
import CartItemModel from './CartItemModel';
import CartItemComponent from './CartItemComponent';
import CartItem from '../../state/CartItem';

export interface ICartProps { }


export default function Cart(props: ICartProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cartCtx = useContext(CartContext)
    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)

    const removeAllItemsOfTypeHandler = (id: string) => {
        cartCtx.removeAllItemsOfType(id)
    }
    const removeItemHandler = (id: string) => {
        cartCtx.removeItem(id)
    }
    const addItemHandler = (item: CartItemModel) => {
        console.log("🚀 ~ file: Cart.tsx ~ line 27 ~ addItemHandler ~ cartCtx", cartCtx.items)
        cartCtx.addItem(item as CartItem)
    }

    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`
    const cartItems = cartCtx.items.map((item: CartItemModel) =>
        <React.Fragment key={item.id}>
            <CartItemComponent
                item={item as CartItemModel}
                removeAllItemsOfType={removeAllItemsOfTypeHandler}
                removeItem={removeItemHandler}
                addItem={addItemHandler}
            />
            <Divider marginTop={'10px'} />
        </React.Fragment>)
    const cartHasItems = cartCtx.items.length > 0
    return (
        <React.Fragment>
            <CartToggleButton onClick={onOpen} badge={numberOfCartItems} />
            <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
                <ModalOverlay bg='blackAlpha.300'
                    backdropFilter='blur(10px)' />
                <ModalContent>
                    <ModalHeader>Your Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <UnorderedList>
                            {cartItems}
                        </UnorderedList>
                        <Box display='flex' flexDirection='row' marginTop='15px'>
                            <Heading size='md'>Total Amount:</Heading>
                            <Spacer />
                            <Text as='b' color='teal' fontSize='lg'>{totalAmount} EUR</Text>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        {cartHasItems && <Button colorScheme='teal' mr={3}>Order</Button>}
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}
