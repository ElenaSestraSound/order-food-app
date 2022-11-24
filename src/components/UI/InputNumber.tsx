import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import * as React from 'react';
import CartItemModel from '../Cart/CartItemModel';

export interface IInputNumberProps {
    id: string,
    min: number,
    max: number,
    default: number,
    maxW: string,
    incrementValue?: () => void
    decrementValue?: () => void
}

const InputNumber = React.forwardRef((props: IInputNumberProps, ref: React.LegacyRef<HTMLInputElement>) => {
    const incrementHandler = () => {
        if (props.incrementValue) {
            props.incrementValue()
        }
    }
    const decrementHandler = () => {
        if (props.decrementValue) {
            props.decrementValue()
        }
    }
    return (
        <NumberInput maxW={props.maxW} id={props.id} min={props.min} max={props.max} defaultValue={props.default}>
            <NumberInputField ref={ref} />
            <NumberInputStepper>
                <NumberIncrementStepper
                    onClick={incrementHandler}
                    bg='green.200'
                    _active={{ bg: 'green.300' }}
                    children='+'
                />
                <NumberDecrementStepper
                    onClick={decrementHandler}
                    bg='pink.200'
                    _active={{ bg: 'pink.300' }}
                    children='-'
                />
            </NumberInputStepper>
        </NumberInput >
    );
})

export default InputNumber
