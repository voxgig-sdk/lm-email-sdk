"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'LmEmail',
        slug: "lm-email",
        version: "0.1.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            }
        },
    };
    options = {
        base: "https://api.linkmobility.com",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            email_create_domain: {},
            email_domain_detail: {},
            email_domain_list: {},
            email_domain_verify: {},
            manage_domain: {},
            send_message: {},
        }
    };
    entity = {
        "email_create_domain": {
            "fields": [
                {
                    "name": "domain",
                    "req": true,
                    "short": "Domain address",
                    "type": "`$STRING`"
                }
            ],
            "name": "email_create_domain",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/v1/domains",
                            "parts": [
                                "email",
                                "v1",
                                "domains"
                            ],
                            "select": {},
                            "transform": {
                                "req": {
                                    "domain": "`reqdata.domain`"
                                },
                                "res": "`body`"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email_domain_detail": {
            "fields": [
                {
                    "name": "dkim",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "dmarc",
                    "type": "`$STRING`"
                },
                {
                    "name": "domain",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "returnpath",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "spf",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "valid",
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "email_domain_detail",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/v1/domains/{id}",
                            "parts": [
                                "email",
                                "v1",
                                "domains",
                                "{id}"
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email_domain_list": {
            "fields": [
                {
                    "name": "dkim_status",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "dmarc_status",
                    "type": "`$STRING`"
                },
                {
                    "name": "domain",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "productId",
                    "type": "`$STRING`"
                },
                {
                    "name": "returnpath_status",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "spf_status",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "valid",
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "email_domain_list",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "page",
                                        "orig": "page",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "size",
                                        "orig": "size",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/v1/domains",
                            "parts": [
                                "email",
                                "v1",
                                "domains"
                            ],
                            "select": {
                                "exist": [
                                    "page",
                                    "size"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.items`"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "email_domain_verify": {
            "fields": [],
            "name": "email_domain_verify",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "domain_id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ],
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "type",
                                        "orig": "type",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/email/v1/domains/{id}/verify",
                            "parts": [
                                "email",
                                "v1",
                                "domains",
                                "{domain_id}",
                                "verify"
                            ],
                            "rename": {
                                "param": {
                                    "id": "domain_id"
                                }
                            },
                            "select": {
                                "exist": [
                                    "domain_id",
                                    "type"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "domain"
                    ]
                ]
            }
        },
        "manage_domain": {
            "fields": [],
            "name": "manage_domain",
            "op": {
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/email/v1/domains/{id}",
                            "parts": [
                                "email",
                                "v1",
                                "domains",
                                "{id}"
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "send_message": {
            "fields": [],
            "name": "send_message",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/email/v1/messages",
                            "parts": [
                                "email",
                                "v1",
                                "messages"
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map