import { AddIcon } from '@chakra-ui/icons';
import { FormControl, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import * as React from 'react';
import CartIcon from '../../Cart/CartIcon';

export interface IMealItemFormProps {
}

export default function MealItemForm(props: IMealItemFormProps) {
    return (
        <FormControl display={'flex'}>
            <NumberInput maxW='100px' id='amount' min={1} max={5} defaultValue={1}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper
                        bg='green.200'
                        _active={{ bg: 'green.300' }}
                        children='+'
                    />
                    <NumberDecrementStepper
                        bg='pink.200'
                        _active={{ bg: 'pink.300' }}
                        children='-'
                    />
                </NumberInputStepper>
            </NumberInput >
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
