import _ from 'the-lodash';
import { Promise } from 'the-promise';

import { IWorldviousService } from '@kubevious/ui-middleware';
import {
    WorldviousNotificationsInfo,
    WorldviousVersionInfoResult,
    WorldviousNotificationItem,
    WorldviousFeedbackSnoozeData,
    WorldviousFeedbackSubmitData
} from '@kubevious/ui-middleware/dist/services/worldvious';

import { TEST_FEEDBACK_QUESTIONS, TEST_MESSAGE_NOTIFICATION, TEST_NEW_VERSION } from './mock/responses';

export class WorldviousService implements IWorldviousService {

    private _items : WorldviousNotificationItem[] = [];

    constructor(empty?: boolean)
    {
        if (empty) {
            return;
        }

        this._items.push(TEST_NEW_VERSION);
        this._items.push(TEST_FEEDBACK_QUESTIONS);
        this._items.push(TEST_MESSAGE_NOTIFICATION);
    }

    getNotificationInfo(): Promise<WorldviousNotificationsInfo>
    {
        return this.getNotifications()
            .then(result => {
                return {
                    count: result.notifications.length
                }
            });
    }

    subscribeToNotificationInfo(cb: (data: WorldviousNotificationsInfo) => void): void
    {
        this.getNotificationInfo()
            .then(result => {
                cb(result);
            });
    }

    getNotifications(): Promise<WorldviousVersionInfoResult>
    {
        return Promise.resolve({
            notifications: this._items
        });
    }

    submitFeedback(data: WorldviousFeedbackSubmitData): Promise<void>
    {
        console.log("[submitFeedback] ", data);
        return Promise.resolve();
    }

    submitSnooze(data: WorldviousFeedbackSnoozeData): Promise<void>
    {
        console.log("[submitSnooze] ", data);

        return Promise.resolve();
    }


    close() {}
}
