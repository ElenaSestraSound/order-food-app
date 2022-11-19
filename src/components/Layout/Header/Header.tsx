import { Box, Button, Flex, Heading, Image, Spacer, useDisclosure } from '@chakra-ui/react';
import * as React from 'react';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css'
import mealsImage from '../../../assets/sushi.jpg'
import Cart from '../../Cart/Cart';

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <React.Fragment>
            <Box as='header'
                className={classes.header}
                backgroundColor='teal.500'>
                <Heading as='h1' size='xl'>React Meals</Heading>
                <Spacer />
                <HeaderCartButton onClick={onOpen} />
            </Box>
            <Cart isOpen={isOpen} onClose={onClose} />
            <Box className={classes.main_image}>
                <img
                    src={mealsImage}
                    alt='A table full of delicious food!'
                />
            </Box>
        </React.Fragment>
    );
}
