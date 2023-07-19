import { Box, Button, Text } from '@chakra-ui/react';
import useServiceStore from './hooks/useServiceStore';
import { TodoistApi } from '@doist/todoist-api-typescript'

declare interface Window { TODOIST_CLIENT_ID: any }

const addService = (service: string) => {
    const TODOIST_CLIENT_ID = (window as any).TODOIST_CLIENT_ID;

    if (service === 'todoist') {
        fetch(`https://todoist.com/oauth/authorize?client_id=${TODOIST_CLIENT_ID}&scope=data:read_write&state=1234`, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "cross-site",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrer": "https://tali.so",
            "referrerPolicy": "origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "no-cors",
            "credentials": "include"
        });
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

    const hanndleRefresh = () => { };

    return (
        <Box>
            <Button onClick={() => addService(service)}>Add {service}</Button>
            <Button onClick={() => refreshService(service, hanndleRefresh)}>Refresh</Button>
            <Text>Task List</Text>
            <Text>Service: {service}</Text>
        </Box>
    );
};

export default TaskList;