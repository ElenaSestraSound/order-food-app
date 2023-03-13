import { Card, CardBody, CardFooter, Heading, Image, Spacer, Stack, Text, useToast } from '@chakra-ui/react';
import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../../../state/CartContext';
import CartItemModel from '../../../../../state/CartItemModel';

export interface IMealItemProps {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
}

export default function MealItem(props: IMealItemProps) {
    const toast = useToast()
    const cartCtx = useContext(CartContext)
    const price = `${props.price.toFixed(2)} EUR`

    const addToCartHandler = (amount: number) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        } as CartItemModel)
        toast({
            title: `${props.name.toUpperCase()} added to cart`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
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
