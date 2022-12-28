import { useState } from 'react'

interface useInputObject {
    value: string | number,
    isValid: boolean,
    hasError: boolean,
    onChangeHandler: (e: React.FormEvent<HTMLInputElement>) => void,
    onBlurHandler: (e: React.FormEvent<HTMLInputElement>) => void,
    reset: () => void
}

function useInput(validateValue: (value: string | number) => boolean): useInputObject {
    const [enteredValue, setEnteredValue] = useState<string | number>('')
    const [isTouched, setIsTouched] = useState<boolean>(false)

    const valueIsValid = validateValue(enteredValue)
    const hasError = !valueIsValid && isTouched

    const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setIsTouched(true)
        setEnteredValue(e.currentTarget.value)
    }
    const onBlurHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setIsTouched(true)
    }

    const reset = () => {
        setEnteredValue('')
        setIsTouched(false)
    }

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        onChangeHandler,
        onBlurHandler,
        reset
    } as useInputObject
}

export default useInput
