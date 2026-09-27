# LmEmail SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "LmEmail",
            "slug": "lm-email",
            "version": "0.1.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.linkmobility.com",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "email_create_domain": {},
                "email_domain_detail": {},
                "email_domain_list": {},
                "email_domain_verify": {},
                "manage_domain": {},
                "send_message": {},
            },
        },
        "entity": {
      "email_create_domain": {
        "fields": [
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
            "req": True,
            "short": "Domain address",
          },
        ],
        "name": "email_create_domain",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/email/v1/domains",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "email",
                  "v1",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": {
                    "domain": "`reqdata.domain`",
                  },
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email_domain_detail": {
        "fields": [
          {
            "name": "dkim",
            "title": "Dkim",
            "type": "`$OBJECT`",
          },
          {
            "name": "dmarc",
            "title": "Dmarc",
            "type": "`$STRING`",
          },
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "returnpath",
            "title": "Returnpath",
            "type": "`$OBJECT`",
          },
          {
            "name": "spf",
            "title": "Spf",
            "type": "`$OBJECT`",
          },
          {
            "name": "valid",
            "title": "Valid",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "email_domain_detail",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/email/v1/domains/{id}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "email",
                  "v1",
                  "domains",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "email_domain_list": {
        "fields": [
          {
            "name": "dkim_status",
            "title": "Dkim Status",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "dmarc_status",
            "title": "Dmarc Status",
            "type": "`$STRING`",
          },
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "productId",
            "title": "Product Id",
            "type": "`$STRING`",
          },
          {
            "name": "returnpath_status",
            "title": "Returnpath Status",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "spf_status",
            "title": "Spf Status",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "valid",
            "title": "Valid",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "email_domain_list",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/email/v1/domains",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "domains",
                  },
                ],
                "parts": [
                  "email",
                  "v1",
                  "domains",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.items`",
                },
                "args": {
                  "query": [
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "size",
                      "orig": "size",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "page",
                    "size",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "kind": "http",
                "method": "GET",
                "orig": "/email/v1/domains/{id}/verify",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "domain_id",
                  },
                  {
                    "lit": "verify",
                  },
                ],
                "parts": [
                  "email",
                  "v1",
                  "domains",
                  "{domain_id}",
                  "verify",
                ],
                "rename": {
                  "param": {
                    "id": "domain_id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "domain_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "domain_id",
                    "type",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "manage_domain": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "manage_domain",
        "op": {
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/email/v1/domains/{id}",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "domains",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "email",
                  "v1",
                  "domains",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
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
                "kind": "http",
                "method": "POST",
                "orig": "/email/v1/messages",
                "segments": [
                  {
                    "lit": "email",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "messages",
                  },
                ],
                "parts": [
                  "email",
                  "v1",
                  "messages",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
