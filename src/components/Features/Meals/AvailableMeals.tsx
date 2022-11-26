import { Box, UnorderedList } from '@chakra-ui/react';
import MealItem from './MealItem/MealItem';
import DUMMY_MEALS from '../../../Data/DummyMeals'

export default function AvailableMeals() {
    const mealsList = DUMMY_MEALS.map(meal =>
        <MealItem key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            image={meal.image} />)
    return (
        <Box as='section'
            padding={'1rem'}
            maxWidth={'60rem'}
            width={'90%'}
            margin={'2rem auto'}>
            <UnorderedList>
                {mealsList}
            </UnorderedList>
        </Box>
    );
}
