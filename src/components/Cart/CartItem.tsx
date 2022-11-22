import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { Text, Card, CardBody, CardFooter, Heading, Stack, IconButton } from '@chakra-ui/react';
import * as React from 'react';
import InputNumber from '../UI/InputNumber';

export interface ICartItemProps {
    id: string,
    name: string,
    amount: number,
    price: number,
    //removeItem: (event: React.MouseEvent<HTMLButtonElement>) => void
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
                    <Text>{props.price.toFixed(2)} EUR</Text>
                </CardBody>
                <CardFooter>
                    <InputNumber
                        maxW='70px'
                        id={'amount_' + props.id}
                        min={1} max={5}
                        default={props.amount} />
                    <IconButton
                        //onClick={props.removeItem}
                        aria-label='add to cart'
                        icon={<DeleteIcon />}
                        colorScheme='red'
                        ml={3} />
                </CardFooter>
            </Stack>
        </Card>
    );
}
