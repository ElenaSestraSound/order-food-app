import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import * as React from 'react';
import DUMMY_MEALS from './../Data/DummyMeals'


export default function AvailableMeals() {
    const mealsList = DUMMY_MEALS.map(meal =>
        <ListItem>{meal.name}</ListItem>)
    return (
        <Box as='section'>
            <UnorderedList>
                {mealsList}
            </UnorderedList>
        </Box>
    );
}
