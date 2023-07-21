'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import ServicesPanel from '../components/ServicesPanel'
import TaskList from '../components/TaskList';
import { VStack, Flex, Box, Center, Text } from '@chakra-ui/react'

export default function App() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const todoistToken = searchParams?.get('todoistAccessToken')

    if (todoistToken) {
        localStorage.setItem('todoistAccessToken', todoistToken);

        router.push("/");
    }

    return (
        <Box>
            <Flex>
                <Center flex='1'>
                    <VStack>
                        <Text
                            fontSize='5xl'
                            bgImage="linear-gradient(to right, #3b82f6, #ef4444)"
                            bgClip="text"
                            color="transparent"
                        >Today and Tomorrow view</Text>
                    </VStack>
                </Center>
                <Box w='200px'>
                    <TaskList />
                </Box>
                <Box w='40px'>
                    <ServicesPanel />
                </Box>
            </Flex>
        </Box>
    );
}