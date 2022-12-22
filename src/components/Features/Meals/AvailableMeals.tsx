import { Box, Skeleton, Spinner, Stack, UnorderedList } from '@chakra-ui/react';
import MealItem from './MealItem/MealItem';
import DUMMY_MEALS from '../../../Data/DummyMeals'
import { useCallback, useEffect, useState } from 'react';
import MealModel from './MealModel';

export default function AvailableMeals() {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchMeals = useCallback(async () => {
        setIsLoading(true)
        setError('')

        try {
            const response = await fetch("https://basicrestfortesting-default-rtdb.europe-west1.firebasedatabase.app/meals.json")
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const meals = await response.json()
            setMeals(meals)
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            }
        }
        setIsLoading(false)
        setError('')
    }, [])

    useEffect(() => {
        fetchMeals()
    }, [fetchMeals])
    const mealsList = meals.map((meal: MealModel) =>
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
            {isLoading && <Box textAlign='center' width='100%'>
                <Spinner alignSelf='center'
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='teal.500'
                    size='xl' />
            </Box>}

            {!isLoading && <UnorderedList m='0'>{mealsList}</UnorderedList>}


        </Box>
    );
}


