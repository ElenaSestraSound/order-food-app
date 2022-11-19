import { Button, Tag, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import CartIcon from '../../Cart/CartIcon';

export interface IHeaderCartButtonProps {
    onClick: () => void
}

export default function HeaderCartButton(props: IHeaderCartButtonProps) {
    return (
        <Button
            onClick={props.onClick}
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
