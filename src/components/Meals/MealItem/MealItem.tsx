import { Button, Card, CardBody, CardFooter, Heading, IconButton, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import CartIcon from '../../Cart/CartIcon';
import MealItemForm from './MealItemForm';
import CartContext from '../../../state/CartContext';
import CartItem from '../../../state/CartItem';

export interface IMealItemProps {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
}

export default function MealItem(props: IMealItemProps) {
    const CartCtx = useContext(CartContext)
    const price = `${props.price.toFixed(2)} EUR`

    const addToCartHandler = (amount: number) => {
        CartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        } as CartItem)
    }
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            marginBottom={'15px'}>
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={props.image}
                alt='Caffe Latte'
            />
            <Stack display='block' width='100%'>
                <CardBody>
                    <Heading as='h3' size='md' color={'teal'}>{props.name}</Heading>
                    <Text py='2'>
                        {props.description}
                    </Text>
                </CardBody>
                <CardFooter display={'block'}>
                    <Text color='teal' fontSize='2xl' marginBottom={'5px'}>
                        {price}
                    </Text>
                    <Spacer />
                    <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
                </CardFooter>
            </Stack>
        </Card>
    );
}
