import { LmEmailEntityBase } from '../LmEmailEntityBase';
import type { LmEmailSDK } from '../LmEmailSDK';
import type { Control } from '../types';
import type { EmailDomainVerify, EmailDomainVerifyLoadMatch } from '../LmEmailTypes';
declare class EmailDomainVerifyEntity extends LmEmailEntityBase<EmailDomainVerify> {
    constructor(client: LmEmailSDK, entopts: any);
    make(this: EmailDomainVerifyEntity): EmailDomainVerifyEntity;
    load(this: any, reqmatch?: EmailDomainVerifyLoadMatch, ctrl?: Control): Promise<EmailDomainVerifyEntity>;
}
export { EmailDomainVerifyEntity };
