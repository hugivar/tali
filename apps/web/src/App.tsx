import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ChakraProvider } from '@chakra-ui/react'
import ServicesPanel from './ServicesPanel'
import TaskList from './TaskList';
import { VStack, Flex, Box, Center, Text } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChakraProvider>
      <Box>
        <Flex>
          <Center flex='1'>
            <VStack>
              <Text fontSize='4xl'>Today and Tomorrow view</Text>
              <div>
                <a href="https://vitejs.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </VStack>
          </Center>
          <Box w='160px'>
            <TaskList />
          </Box>
          <Box w='60px'>
            <ServicesPanel />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default App
