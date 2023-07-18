import { Image, IconButton } from '@chakra-ui/react'
import useServiceStore from './hooks/useServiceStore';

import todoistLogo from '/todoist.png'
import linearLogo from '/linear.png'


const ServicesPanel = () => {
    const { setService } = useServiceStore();

    return (
        <div>
            <IconButton
                aria-label='Todoist Service'
                icon={<Image src={todoistLogo} htmlWidth="30" />}
                onClick={() => setService('todoist')}
            />
            <IconButton
                aria-label='Linear Service'
                icon={<Image src={linearLogo} htmlWidth="30" />}
                onClick={() => setService('linear')}
            />
        </div>
    );
};

export default ServicesPanel;