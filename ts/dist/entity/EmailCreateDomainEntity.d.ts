import { LmEmailEntityBase } from '../LmEmailEntityBase';
import type { LmEmailSDK } from '../LmEmailSDK';
import type { Control } from '../types';
import type { EmailCreateDomain, EmailCreateDomainCreateData } from '../LmEmailTypes';
declare class EmailCreateDomainEntity extends LmEmailEntityBase<EmailCreateDomain> {
    constructor(client: LmEmailSDK, entopts: any);
    make(this: EmailCreateDomainEntity): EmailCreateDomainEntity;
    create(this: any, reqdata?: EmailCreateDomainCreateData, ctrl?: Control): Promise<EmailCreateDomainEntity>;
}
export { EmailCreateDomainEntity };
