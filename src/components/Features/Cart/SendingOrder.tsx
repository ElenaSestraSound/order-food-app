import { Box, Center, Heading, Spinner } from '@chakra-ui/react';
import * as React from 'react';

export interface ISendingOrderProps {
}

export default function SendingOrder(props: ISendingOrderProps) {
    return (
        <Box padding='40px' alignContent='center'>
            <Heading mb='24px'>Sending your order...</Heading>
            <Center >
                <Spinner
                    thickness='6px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='teal.500'
                    size='xl' />
            </Center>
        </Box>
    );
}
