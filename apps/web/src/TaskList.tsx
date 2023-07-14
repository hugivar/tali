import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import useServiceStore from './hooks/useServiceStore';
import { TodoistApi } from '@doist/todoist-api-typescript'

const authorizeService = async (service) => {
    if (service === 'todoist') {
        const api = new TodoistApi(import.meta.env.VITE_TODOIST_TOKEN);

        api.getTasks()
            .then((tasks) => console.log(tasks))
            .catch((error) => console.log(error))
    };
};

const TaskList = () => {
    const { service } = useServiceStore();

    return (
        <Box>
            <Button onClick={() => authorizeService(service)}>Authorize {service}</Button>
            <Button>Refresh</Button>
            <Text>Task List</Text>
            <Text>Service: {service}</Text>
        </Box>
    );
};

export default TaskList;