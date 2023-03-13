import { Alert, AlertIcon, Box, Spinner, UnorderedList } from '@chakra-ui/react';
import MealItem from './MealItem';
import { useEffect, useState } from 'react';
import MealModel from './MealItem/MealModel';
import useHttp from 'hooks/use-http';
import classes from './styles.module.css'

export default function AvailableMeals() {
    const [meals, setMeals] = useState<MealModel[]>([])
    const { isLoading, hasError, sendRequest: fetchMeals } = useHttp()
    const [slideClass, setSlideClass] = useState<string>('')

    useEffect(() => {
        const pushMeals = (mealsObj: MealModel[]) => {
            const loadedMeals = []
            for (const mealKey in mealsObj) {
                const meal: MealModel = {
                    id: mealsObj[mealKey].id,
                    name: mealsObj[mealKey].name,
                    description: mealsObj[mealKey].description,
                    price: mealsObj[mealKey].price,
                    image: mealsObj[mealKey].image
                }
                loadedMeals.push(meal)
            }
            setMeals(loadedMeals)
            setSlideClass(classes.slide)
        }
        fetchMeals(
            { url: process.env.REACT_APP_MEALS_DATABASE_URL as string },
            pushMeals)
    }, [fetchMeals])

    const mealsList = meals.map((meal: MealModel) =>
        <MealItem key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            image={meal.image} />)
    let content = <div></div>
    if (!isLoading && !hasError) {
        content = <UnorderedList m='0'>{mealsList}</UnorderedList>
    }
    if (isLoading && !hasError) {
        content = <Box textAlign='center' width='100%'>
            <Spinner alignSelf='center'
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='teal.500'
                size='xl' />
        </Box>
    }
    if (hasError) {
        content = <Alert status='error'>
            <AlertIcon />
            There was a problem loading the content
        </Alert>
    }
    return (
        <Box as='section' className={slideClass}
            padding={'1rem'}
            maxWidth={'60rem'}
            width={'90%'}
            margin={'2rem auto'}>
            {content}
        </Box>
    );
}


