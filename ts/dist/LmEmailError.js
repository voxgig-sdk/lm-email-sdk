"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmEmailError = void 0;
class LmEmailError extends Error {
    isLmEmailError = true;
    sdk = 'LmEmail';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LmEmailError = LmEmailError;
//# sourceMappingURL=LmEmailError.js.map