import { Box, Heading, Spacer } from '@chakra-ui/react';
import * as React from 'react';
import classes from './styles.module.css'
import mealsImage from './../../../assets/sushi.jpg'
import Cart from '../Cart';


export default function Header() {
    return (
        <React.Fragment>
            <Box as='header'
                className={classes.header}
                backgroundColor='teal.500'>
                <Heading as='h1' size='xl'>React Meals</Heading>
                <Spacer />
                <Cart />
            </Box>
            <Box className={classes.main_image}>
                <img src={mealsImage} alt='A table full of delicious food!' />
            </Box>
        </React.Fragment>
    );
}
