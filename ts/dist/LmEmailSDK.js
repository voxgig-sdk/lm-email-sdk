"use strict";
// LmEmail Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.LmEmailSDK = exports.LmEmailEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const EmailCreateDomainEntity_1 = require("./entity/EmailCreateDomainEntity");
const EmailDomainDetailEntity_1 = require("./entity/EmailDomainDetailEntity");
const EmailDomainListEntity_1 = require("./entity/EmailDomainListEntity");
const EmailDomainVerifyEntity_1 = require("./entity/EmailDomainVerifyEntity");
const ManageDomainEntity_1 = require("./entity/ManageDomainEntity");
const SendMessageEntity_1 = require("./entity/SendMessageEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const LmEmailEntityBase_1 = require("./LmEmailEntityBase");
Object.defineProperty(exports, "LmEmailEntityBase", { enumerable: true, get: function () { return LmEmailEntityBase_1.LmEmailEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class LmEmailSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        if (null != this._options.extend) {
            for (let f of this._options.extend) {
                featureAdd(this._rootctx, f);
            }
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        // Build spec directly from SDK options + user-provided fetch args.
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        // Merge user-provided headers over SDK defaults.
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // Apply SDK auth (apikey, auth prefix, etc.)
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    async direct(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    // Entity access: `client.EmailCreateDomain().list()` / `client.EmailCreateDomain().load({ id })`.
    EmailCreateDomain(data) {
        const self = this;
        return new EmailCreateDomainEntity_1.EmailCreateDomainEntity(self, data);
    }
    // Entity access: `client.EmailDomainDetail().list()` / `client.EmailDomainDetail().load({ id })`.
    EmailDomainDetail(data) {
        const self = this;
        return new EmailDomainDetailEntity_1.EmailDomainDetailEntity(self, data);
    }
    // Entity access: `client.EmailDomainList().list()` / `client.EmailDomainList().load({ id })`.
    EmailDomainList(data) {
        const self = this;
        return new EmailDomainListEntity_1.EmailDomainListEntity(self, data);
    }
    // Entity access: `client.EmailDomainVerify().list()` / `client.EmailDomainVerify().load({ id })`.
    EmailDomainVerify(data) {
        const self = this;
        return new EmailDomainVerifyEntity_1.EmailDomainVerifyEntity(self, data);
    }
    // Entity access: `client.ManageDomain().list()` / `client.ManageDomain().load({ id })`.
    ManageDomain(data) {
        const self = this;
        return new ManageDomainEntity_1.ManageDomainEntity(self, data);
    }
    // Entity access: `client.SendMessage().list()` / `client.SendMessage().load({ id })`.
    SendMessage(data) {
        const self = this;
        return new SendMessageEntity_1.SendMessageEntity(self, data);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new LmEmailSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return LmEmailSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'LmEmail' };
    }
    toString() {
        return 'LmEmail ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.LmEmailSDK = LmEmailSDK;
const SDK = LmEmailSDK;
exports.SDK = SDK;
//# sourceMappingURL=LmEmailSDK.js.map