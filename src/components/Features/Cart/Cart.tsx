import { Text, Box, Button, Divider, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Spacer, UnorderedList, useToast, ButtonGroup } from '@chakra-ui/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import CartToggleButton from './CartToggleButton';
import CartContext from '../../../state/CartContext';
import CartItem from './CartItem';
import CartItemModel from '../../../state/CartItemModel';
import classes from './Cart.module.css'
import CheckoutForm from './CheckoutForm';
import useHttp from '../../../hooks/use-http';
import SendingOrder from './SendingOrder';
import OrderHasBeenSent from './OrderHasBeenSent';

export default function Cart() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cartCtx = useContext(CartContext)

    //CART HANDLERS-------------------------------------------------------------------------------
    const removeAllItemsOfTypeHandler = (id: string) => cartCtx.removeAllItemsOfType(id)
    const removeItemHandler = (id: string) => cartCtx.removeItem(id)
    const addItemHandler = (item: CartItemModel) => cartCtx.addItem(item)
    const emptyCartHandler = () => cartCtx.emptyCart()

    //CART BUTTON BUMP ANIMATION------------------------------------------------------------------
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const buttonClass = btnIsHighlighted ? classes.jello : ''
    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return
        }
        setBtnIsHighlighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 900)
        return () => { clearTimeout(timer) }
    }, [cartCtx.items])

    //COMPONENT VARIABLES -------------------------------------------------------------------------
    const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => currentNumber + item.amount, 0)
    const cartTotalAmount = `${cartCtx.totalAmount.toFixed(2)}`
    const cartItems = cartCtx.items.map((item: CartItemModel) =>
        <React.Fragment key={item.id}>
            <CartItem
                item={item}
                removeAllItemsOfType={removeAllItemsOfTypeHandler}
                removeItem={removeItemHandler}
                addItem={addItemHandler}
            />
            <Divider marginTop={'10px'} />
        </React.Fragment>)
    const cartHasItems = cartCtx.items.length > 0

    const [isCheckout, setCheckout] = useState(false)
    const [buttonsAnimationClass, setButtonsAnimationClass] = useState('')

    const onCheckoutToggleHandler = () => {
        setCheckout(!isCheckout)
        if (buttonsAnimationClass === '' || classes.slideInLeftReverse) {
            setButtonsAnimationClass(classes.slideInLeft)
        } else {
            setButtonsAnimationClass(classes.slideInLeftReverse)
        }
    }


    const { isLoading, hasError, sendRequest: sendOrder } = useHttp()
    const [orderIsSent, setOrderIsSent] = useState(false)
    const toast = useToast()
    const onConfirmOrder = (userData: {}) => {
        const orderData = {
            userData, productData: cartCtx.items
        }
        sendOrder({
            url: 'https://basicrestfortesting-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: orderData
        },
            () => {
                toast({
                    title: 'We will deliver your order soon',
                    position: 'top-right',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                emptyCartHandler()
                setOrderIsSent(true)
            }
        )
        if (hasError) {
            toast({
                title: hasError,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const closeModal = () => {
        setOrderIsSent(false)
        onClose()
    }
    return (
        <React.Fragment>
            <CartToggleButton className={buttonClass} onClick={onOpen} badge={numberOfCartItems} />
            <Modal isOpen={isOpen} onClose={closeModal} motionPreset='slideInBottom' >
                <ModalOverlay bg='blackAlpha.300'
                    backdropFilter='blur(10px)' />
                <ModalContent>
                    {!isLoading && !orderIsSent && <ModalHeader>Your Order</ModalHeader>}
                    {!isLoading && <ModalCloseButton />}
                    {!isLoading && !orderIsSent &&
                        <Fragment>
                            <ModalBody>
                                <UnorderedList>
                                    {cartItems}
                                </UnorderedList>
                                <Box display='flex' flexDirection='row' marginTop='15px'>
                                    <Heading size='md'>Total Amount:</Heading>
                                    <Spacer />
                                    <Text as='b' color='teal' fontSize='lg'>{cartTotalAmount} EUR</Text>
                                </Box>
                            </ModalBody>
                            {isCheckout && <Divider marginTop={'10px'} />}
                            {isCheckout && <CheckoutForm onCancelCheckout={onCheckoutToggleHandler} onConfirmOrder={onConfirmOrder} />}
                            {!isCheckout && <ModalFooter>
                                <ButtonGroup gap={2} mt={3} className={buttonsAnimationClass}>
                                    {cartHasItems && <Button colorScheme='teal' onClick={onCheckoutToggleHandler}>Order</Button>}
                                    <Button variant='ghost' onClick={closeModal}>Close</Button>
                                </ButtonGroup>
                            </ModalFooter>}
                        </Fragment>
                    }
                    {isLoading && <SendingOrder />}
                    {!isLoading && orderIsSent && <OrderHasBeenSent />}
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}
