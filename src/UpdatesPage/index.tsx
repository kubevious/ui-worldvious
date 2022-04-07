import React, { FC, useState } from 'react';

import { InnerPage, PageHeader } from '@kubevious/ui-components';

import { IWorldviousService } from '@kubevious/ui-middleware';
import { WorldviousVersionInfoResult } from '@kubevious/ui-middleware/dist/services/worldvious';

import { useService } from '@kubevious/ui-framework';
import { NotificationList } from '../NotificationList';

export const UpdatesPage: FC = () => {
    
    const [versionInfo, setVersionInfo] = useState<WorldviousVersionInfoResult | null>(null);

    useService<IWorldviousService>({ kind: 'worldvious' }, 
        (svc) => {
            svc.getNotifications()
                .then(result => {
                    setVersionInfo(result);
                })
        });


    return (
        <InnerPage 
            midNarrow
            header={<PageHeader title="Updates" />}
            >

            {versionInfo &&
                <NotificationList versionInfo={versionInfo} />
            }

        </InnerPage>
    );
};
