"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('EmailDomainDetailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LM_EMAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LM_EMAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LmEmailSDK.test();
        const ent = testsdk.EmailDomainDetail();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.LmEmailSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.EmailDomainDetail().load({ "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LM_EMAIL_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email_domain_detail.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dkim": { "a": true, "h": "Dkim", "n": "dkim", "r": false, "t": "`$OBJECT`", "key$": "dkim", "index$": 0 }, "dmarc": { "a": true, "h": "Dmarc", "n": "dmarc", "r": false, "t": "`$STRING`", "key$": "dmarc", "index$": 1 }, "domain": { "a": true, "h": "Domain", "n": "domain", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Domain address", "t": "`$STRING`", "key$": "domain", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "returnpath": { "a": true, "h": "Returnpath", "n": "returnpath", "r": false, "t": "`$OBJECT`", "key$": "returnpath", "index$": 4 }, "spf": { "a": true, "h": "Spf", "n": "spf", "r": false, "t": "`$OBJECT`", "key$": "spf", "index$": 5 }, "valid": { "a": true, "h": "Valid", "n": "valid", "r": false, "t": "`$BOOLEAN`", "key$": "valid", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "email_domain_detail", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["domain"], "co": { "id": "POST /email/v1/domains", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/email/v1/domains", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "v1" }, { "lit": "domains" }], "t": { "req": { "domain": "`reqdata.domain`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /email/v1/domains/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/email/v1/domains/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "email" }, { "lit": "v1" }, { "lit": "domains" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "email_domain_detail", "name__orig": "email_domain_detail", "Name": "EmailDomainDetail", "name_": "email_domain_detail", "name-": "email-domain-detail", "NAME": "EMAIL_DOMAIN_DETAIL", "index$": 0 }, { "active": true, "entity": "email_domain_detail", "key$": "BasicEmailDomainDetailFlow", "kind": "basic", "name": "BasicEmailDomainDetailFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_domain_detail_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "email_domain_detail_ref01", "srcdatavar": "email_domain_detail_ref01_data", "suffix": "_dt0" }, "m": { "id": "email_domain_detail01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_domain_detail_ref01" } }], "index$": 1 }] }, 'EmailDomainDetail', { "POST /email/v1/domains": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "required": ["domain"], "type": "object", "properties": { "domain": { "minLength": 1, "type": "string", "description": "Domain address", "key$": "domain" } }, "additionalProperties": false, "x-ref": "#/components/schemas/EmailCreateDomainRequest", "index$": 1 } } } }, "parameters": [] }, "GET /email/v1/domains/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "schema": { "type": "integer", "format": "int32" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const email_domain_detail_ref01_ent = client.EmailDomainDetail();
        let email_domain_detail_ref01_data = setup.data.new.email_domain_detail['email_domain_detail_ref01'];
        email_domain_detail_ref01_data = (await email_domain_detail_ref01_ent.create(email_domain_detail_ref01_data)).data();
        (0, node_assert_1.default)(null != email_domain_detail_ref01_data.id);
        // LOAD
        const email_domain_detail_ref01_match_dt0 = {};
        email_domain_detail_ref01_match_dt0.id = email_domain_detail_ref01_data.id;
        const email_domain_detail_ref01_data_dt0 = (await email_domain_detail_ref01_ent.load(email_domain_detail_ref01_match_dt0)).data();
        (0, node_assert_1.default)(email_domain_detail_ref01_data_dt0.id === email_domain_detail_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email_domain_detail/EmailDomainDetailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LmEmailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email_domain_detail01', 'email_domain_detail02', 'email_domain_detail03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID': idmap,
        'LM_EMAIL_TEST_LIVE': 'FALSE',
        'LM_EMAIL_TEST_EXPLAIN': 'FALSE',
        'LM_EMAIL_APIKEY': '',
    });
    idmap = env['LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID'];
    const live = 'TRUE' === env.LM_EMAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LmEmailSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LM_EMAIL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LM_EMAIL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=EmailDomainDetailEntity.test.js.map