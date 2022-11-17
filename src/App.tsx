import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Header from "./components/Layout/Header/Header"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
  </ChakraProvider>
)
