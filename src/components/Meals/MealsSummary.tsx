import { Box, Text } from '@chakra-ui/react';
import * as React from 'react';

export default function MealsSummary() {
    return (
        <Box as='section'>
            <Text as='h2'>Delicious Food, Delivered To You</Text>
            <Text as='p'>
                Choose your favourite meal from our abroad selection of available
                meals and enjoy a delicious lunch or dinner at home.
            </Text>
            <Text as='p'>
                All our meals are cooked with high-quality ingridients, just-in-time and
                of course by experienced chefs!
            </Text>

        </Box>
    );
}
