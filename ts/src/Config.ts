
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'LmEmail',
        slug: "lm-email",
    version: "0.1.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://api.linkmobility.com",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      email_create_domain: {
      },

      email_domain_detail: {
      },

      email_domain_list: {
      },

      email_domain_verify: {
      },

      manage_domain: {
      },

      send_message: {
      },

    }
  }


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
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "domains"
                }
              ],
              "select": {},
              "transform": {
                "req": {
                  "domain": "`reqdata.domain`"
                },
                "res": "`body`"
              },
              "parts": [
                "email",
                "v1",
                "domains"
              ]
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
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "domains"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "email",
                "v1",
                "domains",
                "{id}"
              ]
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
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "domains"
                }
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
              },
              "parts": [
                "email",
                "v1",
                "domains"
              ]
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
              "rename": {
                "param": {
                  "id": "domain_id"
                }
              },
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "domains"
                },
                {
                  "var": "domain_id"
                },
                {
                  "lit": "verify"
                }
              ],
              "select": {
                "exist": [
                  "domain_id",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "email",
                "v1",
                "domains",
                "{domain_id}",
                "verify"
              ]
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
      "fields": [
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "domains"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "email",
                "v1",
                "domains",
                "{id}"
              ]
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
              "segments": [
                {
                  "lit": "email"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "messages"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "email",
                "v1",
                "messages"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

