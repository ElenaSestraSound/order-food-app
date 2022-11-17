import { Box, Button, Flex, Heading, Image, Spacer } from '@chakra-ui/react';
import * as React from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css'

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {
    return (
        <React.Fragment>
            <Box as='header'
                className={classes.header}
                backgroundColor='teal.500'>
                <Heading as='h1' size='xl'>React Meals</Heading>
                <Spacer />
                <HeaderCartButton />
            </Box>
            <Box className={classes.main_image}>
                <img
                    src='https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg'
                    alt='A table full of delicious food!'
                />
            </Box>
        </React.Fragment>
    );
}
