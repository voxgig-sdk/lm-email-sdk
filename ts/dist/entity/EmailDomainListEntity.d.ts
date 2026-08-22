import { LmEmailEntityBase } from '../LmEmailEntityBase';
import type { LmEmailSDK } from '../LmEmailSDK';
import type { Control } from '../types';
import type { EmailDomainList, EmailDomainListListMatch } from '../LmEmailTypes';
declare class EmailDomainListEntity extends LmEmailEntityBase<EmailDomainList> {
    constructor(client: LmEmailSDK, entopts: any);
    make(this: EmailDomainListEntity): EmailDomainListEntity;
    list(this: any, reqmatch?: EmailDomainListListMatch, ctrl?: Control): Promise<EmailDomainListEntity[]>;
}
export { EmailDomainListEntity };
