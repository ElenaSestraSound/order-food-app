import { Button, Tag } from '@chakra-ui/react';
import CartIcon from './cartIcon';

interface ICartToggleButtonProps {
    badge: number,
    onClick: () => void,
    className: string
}

export default function CartToggleButton(props: ICartToggleButtonProps) {
    return (
        <Button
            className={props.className}
            onClick={props.onClick}
            leftIcon={<CartIcon />}
            backgroundColor={'white'}
            color={'teal.500'}>
            Cart
            <Tag
                size='md'
                backgroundColor={'teal.50'}
                color={'teal.500'}
                marginLeft='5px'>{props.badge}</Tag>
        </Button>
    );
}
