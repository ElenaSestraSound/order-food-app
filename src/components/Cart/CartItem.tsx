import { Text, Card, CardBody, CardFooter, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from '@chakra-ui/react';
import * as React from 'react';
import InputNumber from '../UI/InputNumber';

export interface ICartItemProps {
    id: string,
    name: string,
    amount: number,
    price: number
}

export default function CartItem(props: ICartItemProps) {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='unstyled'>
            <Stack display='flex' flexDirection='row' width='100%'>
                <CardBody>
                    <Heading as='h3' size='md' color={'teal'}>{props.name}</Heading>
                    <Text>{props.price}</Text>
                </CardBody>
                <CardFooter>
                    <InputNumber
                        maxW='70px'
                        id={'amount_' + props.id}
                        min={1} max={5}
                        default={props.amount} />
                </CardFooter>
            </Stack>
        </Card>
    );
}
