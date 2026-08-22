import { LmEmailEntityBase } from '../LmEmailEntityBase';
import type { LmEmailSDK } from '../LmEmailSDK';
import type { Control } from '../types';
import type { ManageDomain, ManageDomainRemoveMatch } from '../LmEmailTypes';
declare class ManageDomainEntity extends LmEmailEntityBase<ManageDomain> {
    constructor(client: LmEmailSDK, entopts: any);
    make(this: ManageDomainEntity): ManageDomainEntity;
    remove(this: any, reqmatch?: ManageDomainRemoveMatch, ctrl?: Control): Promise<ManageDomainEntity>;
}
export { ManageDomainEntity };
