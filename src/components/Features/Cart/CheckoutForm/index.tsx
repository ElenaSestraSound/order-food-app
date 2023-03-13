import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, Heading, Icon, Input, InputGroup, InputLeftElement, Spacer } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useInput from "hooks/use-input";
import { BiUserCircle, BiBuildingHouse, BiEnvelopeOpen } from "react-icons/bi"
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import classes from '../styles.module.css'

export interface ICheckoutFormProps {
    onConfirmOrder: (userData: {}) => void
    onCancelCheckout: () => void
}

export default function CheckoutForm(props: ICheckoutFormProps) {
    const validateText = (value: string | number) => {
        if (typeof value === 'string') {
            return value.trim() !== ''
        }
        return false
    }
    const {
        value: nameValue,
        isValid: nameIsValid,
        hasError: nameHasError,
        onChangeHandler: onNameChangeHandler,
        onBlurHandler: onNameBlurHandler,
        reset: nameReset
    } = useInput(validateText)

    const {
        value: surnameValue,
        isValid: surnameIsValid,
        hasError: surnameHasError,
        onChangeHandler: onSurnameChangeHandler,
        onBlurHandler: onSurnameBlurHandler,
        reset: surnameReset
    } = useInput(validateText)

    const {
        value: addressValue,
        isValid: addressIsValid,
        hasError: addressHasError,
        onChangeHandler: onAddressChangeHandler,
        onBlurHandler: onAddressBlurHandler,
        reset: addressReset
    } = useInput(validateText)

    const {
        value: codeValue,
        isValid: codeIsValid,
        hasError: codeHasError,
        onChangeHandler: onCodeChangeHandler,
        onBlurHandler: onCodeBlurHandler,
        reset: codeReset
    } = useInput(validateText)

    const validateEmail = (value: string | number) => {
        if (typeof value === 'string') {
            return value.trim() !== '' && value.includes('@')
        }
        return false
    }
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        onChangeHandler: onEmailChangeHandler,
        onBlurHandler: onEmailBlurHandler,
        reset: emailReset
    } = useInput(validateEmail)

    const {
        value: phoneValue,
        isValid: phoneIsValid,
        hasError: phoneHasError,
        onChangeHandler: onPhoneChangeHandler,
        onBlurHandler: onPhoneBlurHandler,
        reset: phoneReset
    } = useInput(validateText)


    const formIsValid = nameIsValid && surnameIsValid && emailIsValid && phoneIsValid && addressIsValid && codeIsValid

    const onSubmitFormHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formIsValid) {
            const formValues = { nameValue, surnameValue, emailValue, phoneValue, addressValue, codeValue }
            console.log("form value: " + JSON.stringify(formValues))
            props.onConfirmOrder(formValues)
        }
    }

    const [animationClass, setAnimationClass] = useState('')
    const onCancelCheckoutHandler = () => {
        setAnimationClass(classes.scaleVerTopReverse)
        props.onCancelCheckout()
    }

    return (
        <Box className={animationClass}>
            <form onSubmit={onSubmitFormHandler} className={classes.form} >
                <Heading size='md' mt='10px' mb='15px'>Shipping Details:</Heading>
                <FormControl isRequired>
                    <Box>
                        <Flex>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<Icon as={BiUserCircle} color={nameHasError ? 'red.500' : 'teal.100'} boxSize={6} />} />
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    value={nameValue}
                                    isInvalid={nameHasError}
                                    focusBorderColor={nameHasError ? 'red.500' : 'teal.500'}
                                    onBlur={onNameBlurHandler}
                                    onChange={onNameChangeHandler}
                                    mr='10px' />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<Icon as={BiUserCircle} color={surnameHasError ? 'red.500' : 'teal.100'} boxSize={6} />} />
                                <Input
                                    type="text"
                                    placeholder="Surname"
                                    value={surnameValue}
                                    isInvalid={surnameHasError}
                                    focusBorderColor={surnameHasError ? 'red.500' : 'teal.500'}
                                    onBlur={onSurnameBlurHandler}
                                    onChange={onSurnameChangeHandler} />
                            </InputGroup>
                        </Flex>
                        <Flex>
                            {nameHasError && <FormHelperText color='red.500'>Name must not be empty</FormHelperText>}
                            <Spacer />
                            {surnameHasError && <FormHelperText color='red.500'>Surname must not be empty</FormHelperText>}
                        </Flex>
                    </Box>
                    <InputGroup mt='10px'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<EmailIcon color={emailHasError ? 'red.500' : 'teal.100'} boxSize={6} />} />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={emailValue}
                            isInvalid={emailHasError}
                            focusBorderColor={emailHasError ? 'red.500' : 'teal.500'}
                            onBlur={onEmailBlurHandler}
                            onChange={onEmailChangeHandler} />
                    </InputGroup>
                    {emailHasError && <FormHelperText color='red.500'>Please, enter a valid email</FormHelperText>}
                    <InputGroup mt='10px'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<PhoneIcon color={phoneHasError ? 'red.500' : 'teal.100'} boxSize={6} />} />
                        <Input
                            type="number"
                            placeholder="Phone Number"
                            value={phoneValue}
                            isInvalid={phoneHasError}
                            focusBorderColor={phoneHasError ? 'red.500' : 'teal.500'}
                            onBlur={onPhoneBlurHandler}
                            onChange={onPhoneChangeHandler} />
                    </InputGroup>
                    {phoneHasError && <FormHelperText color='red.500'>Phone number must not be empty</FormHelperText>}
                    <InputGroup mt='10px'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<Icon as={BiBuildingHouse} color={addressHasError ? 'red.500' : 'teal.100'} boxSize={6} />} />
                        <Input
                            type="text"
                            placeholder="Address"
                            value={addressValue}
                            isInvalid={addressHasError}
                            focusBorderColor={addressHasError ? 'red.500' : 'teal.500'}
                            onBlur={onAddressBlurHandler}
                            onChange={onAddressChangeHandler} />
                    </InputGroup>
                    {addressHasError && <FormHelperText color='red.500'>Address must not be empty</FormHelperText>}
                    <InputGroup mt='10px'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<Icon as={BiEnvelopeOpen} color={codeHasError ? 'red.500' : 'teal.100'} boxSize={6} />} />
                        <Input
                            type="number"
                            placeholder="Zip Code"
                            value={codeValue}
                            isInvalid={codeHasError}
                            focusBorderColor={codeHasError ? 'red.500' : 'teal.100'}
                            onBlur={onCodeBlurHandler}
                            onChange={onCodeChangeHandler} />
                    </InputGroup>
                    {codeHasError && <FormHelperText color='red.500'>Zip code must not be empty</FormHelperText>}
                    <Box textAlign='right'>
                        <ButtonGroup gap={2} mt={3} pb='8px'>
                            <Button type="submit" colorScheme='green'>Confirm</Button>
                            <Button colorScheme='red' onClick={onCancelCheckoutHandler}>Cancel</Button>
                        </ButtonGroup>
                    </Box>
                </FormControl>
            </form>
        </Box>
    );
}
