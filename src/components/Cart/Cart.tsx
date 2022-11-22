import { Text, Box, Button, Divider, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spacer, UnorderedList } from '@chakra-ui/react';
import React, { useContext } from 'react';
import CartToggleButton from './CartToggleButton';
import CartItem from './CartItem';

import CartContext from '../../state/CartContext';

export interface ICartProps { }


export default function Cart(props: ICartProps) {
    const cartContext = useContext(CartContext)
    const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cartItems = [
        { id: 'c1', name: 'Sushi', amount: 2, price: 12.99 },
        { id: 'c2', name: 'Snitzel', amount: 4, price: 14.99 }].map(item =>
            <React.Fragment>
                <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price} />
                <Divider marginTop={'10px'} />
            </React.Fragment>
        )
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
                            <Text as='b' color='teal' fontSize='lg'>35.99 EUR</Text>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Order</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}
