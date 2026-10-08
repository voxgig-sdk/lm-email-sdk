import { LmEmailEntityBase } from '../LmEmailEntityBase';
import type { LmEmailSDK } from '../LmEmailSDK';
import type { Control } from '../types';
import type { EmailDomainDetail, EmailDomainDetailLoadMatch, EmailDomainDetailCreateData } from '../LmEmailTypes';
declare class EmailDomainDetailEntity extends LmEmailEntityBase<EmailDomainDetail> {
    constructor(client: LmEmailSDK, entopts: any);
    make(this: EmailDomainDetailEntity): EmailDomainDetailEntity;
    load(this: any, reqmatch?: EmailDomainDetailLoadMatch, ctrl?: Control): Promise<EmailDomainDetailEntity>;
    create(this: any, reqdata?: EmailDomainDetailCreateData, ctrl?: Control): Promise<EmailDomainDetailEntity>;
}
export { EmailDomainDetailEntity };
