import 'jest';

import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { UpdatesPage } from '../src';
import { app } from '@kubevious/ui-framework/dist';

import { WorldviousService } from './services/WorldviousService';

import { TEST_FEEDBACK_QUESTIONS, TEST_MESSAGE_NOTIFICATION, TEST_NEW_VERSION } from './services/mock/responses';


const renderComponent = (): RenderResult => render(<UpdatesPage />);

describe('UpdatesPage', () => {
    test('test-01', async () => {

        app.registerService({ kind: 'worldvious' }, () => {
            return new WorldviousService(
                [
                    TEST_FEEDBACK_QUESTIONS,
                    TEST_MESSAGE_NOTIFICATION,
                    TEST_NEW_VERSION
                ]
            );
        });
        
        const { findByTestId } = renderComponent();

        const page = await findByTestId('inner-page');

        expect(page).toBeTruthy();
    });
});
