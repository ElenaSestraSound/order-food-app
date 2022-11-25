import { FormControl, IconButton } from '@chakra-ui/react';
import React, { useRef } from 'react';
import CartIcon from '../../Cart/CartIcon';
import InputNumber from '../../UI/InputNumber';

export interface IMealItemFormProps {
    id: string,
    onAddToCart: (amount: number) => void
}

export default function MealItemForm(props: IMealItemFormProps) {
    const amountInputRef = useRef<HTMLInputElement>(null)
    const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const enteredAmount = amountInputRef.current?.value
        if (enteredAmount) {
            props.onAddToCart(+enteredAmount)
        }
    }
    return (
        <FormControl display={'flex'}>
            <InputNumber
                ref={amountInputRef}
                maxW='100px'
                id={'amount' + props.id}
                min={1}
                max={5}
                default={1} />
            <IconButton
                onClick={submitHandler}
                aria-label='add to cart'
                icon={<CartIcon />}
                colorScheme={'teal'}
                marginLeft={'10px'}
                paddingLeft={'10px'}
                paddingRight={'5px'} />
        </FormControl>
    );
}
