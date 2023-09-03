'use client'

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import ServicesPanel from '../components/ServicesPanel'
import TaskList from '../components/TaskList';
import { VStack, Flex, Box, Container, Text, Switch, FormControl, FormLabel, Divider, Card, InputGroup, InputLeftAddon, CardBody, Input, Progress, HStack } from '@chakra-ui/react'
import { HiOutlineClock } from 'react-icons/hi';
import { trpc } from '../utils/trpc';
import TaskView from '~/components/TaskView';

function App() {
    const [tomorrowView, showTomorrowView] = useState(false);
    const [timeBasedProgress, setTimeBasedProgress] = useState(false);
    const [totalHours, setTotalHours] = useState(8);

    const router = useRouter();
    const searchParams = useSearchParams()
    const todoistToken = searchParams?.get('todoistAccessToken')
    const linearToken = searchParams?.get('linearAccessToken')

    if (todoistToken) {
        localStorage.setItem('todoistAccessToken', todoistToken);

        router.push("/");
    }

    if (linearToken) {
        localStorage.setItem('linearAccessToken', linearToken);

        router.push("/");
    }

    return (
        <Flex>
            <TaskView />
        </Flex>
    );

    return (
        <Flex>
            <Container>
                <VStack spacing={10}>
                    <Box>
                        <HStack justifyContent="space-between">
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='tomorrow-view' mb='0'>
                                    Show tomorrow view?
                                </FormLabel>
                                <Switch id='tomorrow-view' onChange={env => showTomorrowView(env.target.checked)} />
                            </FormControl>
                            <FormControl display='flex' alignItems='center'>
                                <FormLabel htmlFor='time-based-progress' mb='0'>
                                    Time based progress
                                </FormLabel>
                                <Switch id='time-based-progress' onChange={env => setTimeBasedProgress(env.target.checked)} />
                            </FormControl>
                            {timeBasedProgress && <FormControl display='flex' alignItems='center'>
                                <InputGroup>
                                    <InputLeftAddon children='Total hours' />
                                    <Input value={totalHours} onChange={event => setTotalHours(Number(event.target.value))} htmlSize={4} width="auto" disabled />
                                </InputGroup>
                            </FormControl>}
                        </HStack>
                        <Text
                            fontSize='5xl'
                            bgClip="text"
                            color="transparent"
                        >Today view</Text>
                        <Box mb="4">
                            <Progress hasStripe value={timeBasedProgress ? 37.5 : 33} />
                            {timeBasedProgress ? <Text>37.5%</Text> : <Text>1/3</Text>}
                        </Box>
                        <VStack spacing="2">
                            <Card w='md' variant="filled">
                                <CardBody>
                                    <HStack justifyContent="space-between">
                                        <Text as='b'>Add graphics to header</Text>
                                        <Text color='red'>Overdue</Text>
                                    </HStack>
                                    <HStack>
                                        <Text>2hrs</Text>
                                        <HiOutlineClock />
                                    </HStack>
                                </CardBody>
                            </Card>
                            <Card w='md' opacity="0.5" variant="filled">
                                <CardBody>
                                    <HStack justifyContent="space-between">
                                        <Text as='s'>Send copy to Jim</Text>
                                        <Text color='green'>Completed</Text>
                                    </HStack>
                                    <HStack>
                                        <Text>3hrs</Text>
                                        <HiOutlineClock />
                                    </HStack>
                                </CardBody>
                            </Card>
                            <Card w='md' variant="filled">
                                <CardBody>
                                    <Text as='b'>Schedule 1 on 1 meeting with the boss</Text>
                                    <HStack>
                                        <Text>2hrs</Text>
                                        <HiOutlineClock />
                                    </HStack>
                                </CardBody>
                            </Card>
                        </VStack>
                    </Box>
                    {tomorrowView && (
                        <Box>
                            <Divider />
                            <Text
                                fontSize='5xl'
                                bgClip="text"
                                color="transparent"
                            >Tomorrow view</Text>
                            <Box mb="4">
                                <Progress hasStripe value={timeBasedProgress ? 60 : 60} colorScheme="purple" />
                                {timeBasedProgress ? <Text>60%</Text> : <Text>6/10</Text>}
                            </Box>
                            <VStack spacing="2">
                                <Card w="md" variant="filled">
                                    <CardBody>
                                        <Text as='b'>Move API to v3</Text>
                                        <HStack>
                                            <Text>2hrs</Text>
                                            <HiOutlineClock />
                                        </HStack>
                                    </CardBody>
                                </Card>
                                <Card w="md" variant="filled">
                                    <CardBody>
                                        <Text as='b'>Refactor component</Text>
                                        <HStack>
                                            <Text>2hrs</Text>
                                            <HiOutlineClock />
                                        </HStack>
                                    </CardBody>
                                </Card>
                                <Card w="md" variant="filled">
                                    <CardBody>
                                        <Text as='b'>Look into caching issues</Text>
                                        <HStack>
                                            <Text>2hrs</Text>
                                            <HiOutlineClock />
                                        </HStack>
                                    </CardBody>
                                </Card>
                            </VStack>
                        </Box>

                    )}
                </VStack>
            </Container>
            <Box w='200px'>
                <TaskList />
            </Box>
            <Box w='40px'>
                <ServicesPanel />
            </Box>
        </Flex>
    );
}

export default trpc.withTRPC(App);