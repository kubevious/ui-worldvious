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

export class WorldviousService implements IWorldviousService {

    private _items : WorldviousNotificationItem[] = [];

    constructor(items: WorldviousNotificationItem[])
    {
        this._items = _.clone(items);
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
