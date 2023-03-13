import { Box, Text } from '@chakra-ui/react';
import classes from './styles.module.css'

export default function MealsSummary() {
    return (
        <Box as='section' className={classes.summary} backgroundColor={'teal'}>
            <Text as='h2' fontSize='3xl' color={'white'}>Delicious Food, Delivered To You</Text>
            <Text as='p' color={'white'}>
                Choose your favourite meal from our abroad selection of available
                meals and enjoy a delicious lunch or dinner at home.
            </Text>
            <br />
            <Text as='p' color={'white'}>
                All our meals are cooked with high-quality ingridients, just-in-time and
                of course by experienced chefs!
            </Text>

        </Box>
    );
}
