import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Header from "./components/Features/Header"
import Meals from "./components/Features/Meals"
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
