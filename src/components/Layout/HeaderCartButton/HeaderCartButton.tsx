import { Button, Tag, Text } from '@chakra-ui/react';
import * as React from 'react';
import CartIcon from './CartIcon';

export interface IHeaderCartButtonProps {
}

export default function HeaderCartButton(props: IHeaderCartButtonProps) {
    return (
        <Button
            leftIcon={<CartIcon />}
            backgroundColor={'white'}
            color={'teal.500'}>
            Cart
            <Tag
                size='md'
                backgroundColor={'teal.50'}
                color={'teal.500'}
                marginLeft='5px'>3</Tag>
        </Button>
    );
}
