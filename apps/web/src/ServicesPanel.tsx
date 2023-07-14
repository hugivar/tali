import React from 'react';
import { Image, IconButton } from '@chakra-ui/react'
import useServiceStore from './hooks/useServiceStore';

const ServicesPanel = () => {
    const { setService } = useServiceStore();

    return (
        <div>
            <IconButton
                aria-label='Todoist Service'
                icon={<Image src="https://s3-us-west-2.amazonaws.com/assets.siftnet.com/integrations/todoist/todoist-icon-128-min.png" htmlWidth="30" />}
                onClick={() => setService('todoist')}
            />
            <IconButton
                aria-label='Linear Service'
                icon={<Image src="https://s3.us-west-2.amazonaws.com/assets.siftnet.com/integrations/linear/linear-icon-128.png" htmlWidth="30" />}
                onClick={() => setService('linear')}
            />
        </div>
    );
};

export default ServicesPanel;