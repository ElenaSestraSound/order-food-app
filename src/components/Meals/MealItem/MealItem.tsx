import { Button, Card, CardBody, CardFooter, Heading, IconButton, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import CartIcon from '../../Cart/CartIcon';
import MealItemForm from './MealItemForm';

export interface IMealItemProps {
    name: string,
    description: string,
    price: number,
    image: string
}

export default function MealItem(props: IMealItemProps) {
    const price = `${props.price.toFixed(2)} EUR`
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
                    <MealItemForm />
                </CardFooter>
            </Stack>
        </Card>
    );
}
