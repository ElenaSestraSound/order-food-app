import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import * as React from 'react';

export interface IInputNumberProps {
    id: string,
    min: number,
    max: number,
    default: number,
    maxW: string
}

export default function InputNumber(props: IInputNumberProps) {
    return (
        <NumberInput maxW={props.maxW} id={props.id} min={props.min} max={props.max} defaultValue={props.default}>
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
    );
}
