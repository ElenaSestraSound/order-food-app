import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Header from "./components/Layout/Header/Header"
import Meals from "./components/Meals/Meals"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <main>
      <Meals />
    </main>
  </ChakraProvider>
)
