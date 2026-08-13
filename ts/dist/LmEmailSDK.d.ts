import { EmailCreateDomainEntity } from './entity/EmailCreateDomainEntity';
import { EmailDomainDetailEntity } from './entity/EmailDomainDetailEntity';
import { EmailDomainListEntity } from './entity/EmailDomainListEntity';
import { EmailDomainVerifyEntity } from './entity/EmailDomainVerifyEntity';
import { ManageDomainEntity } from './entity/ManageDomainEntity';
import { SendMessageEntity } from './entity/SendMessageEntity';
export type * from './LmEmailTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LmEmailEntityBase } from './LmEmailEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LmEmailSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    EmailCreateDomain(data?: any): EmailCreateDomainEntity;
    EmailDomainDetail(data?: any): EmailDomainDetailEntity;
    EmailDomainList(data?: any): EmailDomainListEntity;
    EmailDomainVerify(data?: any): EmailDomainVerifyEntity;
    ManageDomain(data?: any): ManageDomainEntity;
    SendMessage(data?: any): SendMessageEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LmEmailSDK;
    tester(testopts?: any, sdkopts?: any): LmEmailSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LmEmailSDK;
export { stdutil, config, BaseFeature, LmEmailEntityBase, LmEmailSDK, SDK, };
