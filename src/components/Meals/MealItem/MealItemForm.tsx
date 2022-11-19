import { AddIcon } from '@chakra-ui/icons';
import { FormControl, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import * as React from 'react';
import CartIcon from '../../Cart/CartIcon';
import InputNumber from '../../UI/InputNumber';

export interface IMealItemFormProps {
    id: string
}

export default function MealItemForm(props: IMealItemFormProps) {
    return (
        <FormControl display={'flex'}>
            <InputNumber
                maxW='100px'
                id={'amount' + props.id}
                min={1}
                max={5}
                default={1} />
            <IconButton
                aria-label='add to cart'
                icon={<CartIcon />}
                colorScheme={'teal'}
                marginLeft={'10px'}
                paddingLeft={'10px'}
                paddingRight={'5px'} />
        </FormControl>
    );
}
