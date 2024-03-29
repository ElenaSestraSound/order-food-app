import { DeleteIcon } from '@chakra-ui/icons';
import { Text, Card, CardBody, CardFooter, Heading, Stack, IconButton } from '@chakra-ui/react';
import CartItemModel from 'state/CartItemModel';
import InputNumber from 'components/DesignSystem/InputNumber';

interface ICartItemComponentProps {
    item: CartItemModel,
    removeAllItemsOfType: (id: string) => void,
    removeItem: (id: string) => void,
    addItem: (item: CartItemModel) => void
}

function CartItem(props: ICartItemComponentProps) {
    const removeAllItemsOfTypeHandler = () => props.removeAllItemsOfType(props.item.id)
    const removeItemHandler = () => props.removeItem(props.item.id)
    const addItemHandler = () => {
        const itemOneByOne = {
            ...props.item,
            amount: 1
        } as CartItemModel
        props.addItem(itemOneByOne)
    }
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='unstyled'>
            <Stack display='flex' flexDirection='row' width='100%'>
                <CardBody>
                    <Heading as='h3' size='md' color={'teal'}>{props.item.name}</Heading>
                    <Text>{props.item.price.toFixed(2)} EUR</Text>
                </CardBody>
                <CardFooter>
                    <InputNumber
                        maxW='70px'
                        id={'amount_' + props.item.id}
                        min={1}
                        default={props.item.amount}
                        incrementValue={addItemHandler.bind(null, props.item)}
                        decrementValue={removeItemHandler.bind(null, props.item.id)} />
                    <IconButton
                        onClick={removeAllItemsOfTypeHandler}
                        aria-label='add to cart'
                        icon={<DeleteIcon />}
                        colorScheme='red'
                        ml={3} />
                </CardFooter>
            </Stack>
        </Card>
    );
}
export default CartItem
