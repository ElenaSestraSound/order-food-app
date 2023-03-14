import { Box, Heading, Progress } from '@chakra-ui/react';

export default function OrderHasBeenSent() {
    return (
        <Box padding='40px' alignContent='center'>
            <Heading mb='24px' textAlign='center'>We Received Your Order</Heading>
            <Progress colorScheme='green' height='32px' value={100} />
        </Box>
    );
}