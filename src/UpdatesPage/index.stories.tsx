import React from 'react';
import { app } from '@kubevious/ui-framework';
import { Story } from '@storybook/react';
import { WorldviousService } from '../../test/services/WorldviousService';

import { UpdatesPage } from './';

import { TEST_FEEDBACK_QUESTIONS, TEST_MESSAGE_NOTIFICATION, TEST_NEW_VERSION } from '../../test/services/mock/responses';


export default {
    title: 'Updates Page',
    component: UpdatesPage
};


export const Default: Story = () => {

    app.registerService({ kind: 'worldvious' }, () => {
        return new WorldviousService(
            [
                TEST_FEEDBACK_QUESTIONS,
                TEST_MESSAGE_NOTIFICATION,
                TEST_NEW_VERSION
            ]
        );
    });

    return (
        <div style={{ minHeight: '100vh', maxWidth: '100vw', width: '100vw', height: '100vh' }}>
            <div style={{ background: '#2f3036', height: '100%', width: '100%', position: 'relative' }}>
                
                <UpdatesPage />
                
            </div>
        </div>
    );
};


export const Empty: Story = () => {
    
    app.registerService({ kind: 'worldvious' }, () => {
        return new WorldviousService([]);
    });

    return (
        <div style={{ minHeight: '100vh', maxWidth: '100vw', width: '100vw', height: '100vh' }}>
            <div style={{ background: '#2f3036', height: '100%', width: '100%', position: 'relative' }}>
                
                <UpdatesPage />
                
            </div>
        </div>
    );

};
