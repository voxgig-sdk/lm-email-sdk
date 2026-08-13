"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmEmailError = void 0;
class LmEmailError extends Error {
    isLmEmailError = true;
    sdk = 'LmEmail';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LmEmailError = LmEmailError;
//# sourceMappingURL=LmEmailError.js.map