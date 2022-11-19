import { Text, Box, Button, Divider, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spacer } from '@chakra-ui/react';
import React from 'react';
import HeaderCartButton from '../Layout/Header/HeaderCartButton';
import CartItem from './CartItem';

export interface ICartProps {
    // isOpen: boolean,
    // onClose: () => void
}

export default function Cart(props: ICartProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cartItems = [
        { id: 'c1', name: 'Sushi', amount: 2, price: 12.99 },
        { id: 'c2', name: 'Snitzel', amount: 4, price: 14.99 }].map(item =>
            <React.Fragment>
                <CartItem
                    id={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price} />
                <Divider marginTop={'10px'} />
            </React.Fragment>
        )
    return (
        <React.Fragment>
            <HeaderCartButton onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Your Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {cartItems}
                        <Box display='flex' flexDirection='row' marginTop='15px'>
                            <Heading size='md'>Total Amount:</Heading>
                            <Spacer />
                            <Text>35.99 EUR</Text>
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
