import * as React from "react"
import {
  ChakraProvider,
  theme,
  useDisclosure,
} from "@chakra-ui/react"
import Header from "./components/Layout/Header/Header"
import Meals from "./components/Meals/Meals"
import CartProvider from "./state/CartProvider"

export const App = () => {
  return (
    < ChakraProvider theme={theme} >
      <CartProvider>
        <Header />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </ChakraProvider >
  )
}
