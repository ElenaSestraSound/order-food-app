import { Box, Center, Heading, Progress, Spinner } from '@chakra-ui/react';
import * as React from 'react';


export default function SendingOrder() {
    return (
        <Box padding='40px' alignContent='center'>
            <Heading mb='24px'>Sending your order...</Heading>
            <Progress colorScheme='blue' height='32px' isIndeterminate />
        </Box>
    );
}
