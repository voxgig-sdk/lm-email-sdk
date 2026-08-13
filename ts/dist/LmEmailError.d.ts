import { Context } from './Context';
declare class LmEmailError extends Error {
    isLmEmailError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { LmEmailError };
