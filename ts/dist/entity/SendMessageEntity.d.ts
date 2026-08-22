import { LmEmailEntityBase } from '../LmEmailEntityBase';
import type { LmEmailSDK } from '../LmEmailSDK';
import type { Control } from '../types';
import type { SendMessage, SendMessageCreateData } from '../LmEmailTypes';
declare class SendMessageEntity extends LmEmailEntityBase<SendMessage> {
    constructor(client: LmEmailSDK, entopts: any);
    make(this: SendMessageEntity): SendMessageEntity;
    create(this: any, reqdata?: SendMessageCreateData, ctrl?: Control): Promise<SendMessageEntity>;
}
export { SendMessageEntity };
