import { LmEmailEntityBase } from '../LmEmailEntityBase';
import type { LmEmailSDK } from '../LmEmailSDK';
import type { Control } from '../types';
import type { EmailDomainDetail, EmailDomainDetailLoadMatch } from '../LmEmailTypes';
declare class EmailDomainDetailEntity extends LmEmailEntityBase<EmailDomainDetail> {
    constructor(client: LmEmailSDK, entopts: any);
    make(this: EmailDomainDetailEntity): EmailDomainDetailEntity;
    load(this: any, reqmatch?: EmailDomainDetailLoadMatch, ctrl?: Control): Promise<EmailDomainDetailEntity>;
}
export { EmailDomainDetailEntity };
