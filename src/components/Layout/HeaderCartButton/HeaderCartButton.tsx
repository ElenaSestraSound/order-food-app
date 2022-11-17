import { StarIcon } from '@chakra-ui/icons';
import { Button, Text } from '@chakra-ui/react';
import * as React from 'react';

export interface IHeaderCartButtonProps {
}

export default function HeaderCartButton(props: IHeaderCartButtonProps) {
    return (
        <Button
            leftIcon={<StarIcon />}
            backgroundColor={'white'}
            color={'teal.500'}>
            Cart
        </Button>
    );
}
