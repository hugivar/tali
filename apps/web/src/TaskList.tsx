import { Box, Button, Text } from '@chakra-ui/react';
import useServiceStore from './hooks/useServiceStore';
import { TodoistApi } from '@doist/todoist-api-typescript'

const addService = (service: string) => {
    if (service === 'todoist') {

    };
};

const refreshService = (service: string, callback: () => void): void => {
    if (service === 'todoist') {
        const api = new TodoistApi(import.meta.env.VITE_TODOIST_TOKEN);

        api.getTasks()
            .then(() => {
                callback();
            })
            .catch((error) => console.log(error))
    };
};

const TaskList = () => {
    const { service } = useServiceStore();

    return (
        <Box>
            <Button onClick={() => addService(service)}>Add {service}</Button>
            <Button onClick={() => refreshService(service)}>Refresh</Button>
            <Text>Task List</Text>
            <Text>Service: {service}</Text>
        </Box>
    );
};

export default TaskList;