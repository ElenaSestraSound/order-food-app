import { Box, Heading, Progress, Text } from '@chakra-ui/react';

interface IErrorInOrderProps {
    message?: String
}
export default function ErrorInOrder({ message = "We couldn't process your order" }: IErrorInOrderProps) {
    return (
        <Box padding='40px' alignContent='center'>
            <Heading mb='24px' textAlign='center'>Something went wrong with your order</Heading>
            <Text>{message}</Text>
            <Progress colorScheme='red' height='32px' value={100} />
        </Box>
    );
}