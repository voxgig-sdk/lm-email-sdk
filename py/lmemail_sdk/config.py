# LmEmail SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "req": True,
            "type": "`$STRING`",
          },
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
                  "domains",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
            "type": "`$OBJECT`",
          },
          {
            "name": "dmarc",
            "type": "`$STRING`",
          },
          {
            "name": "domain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "returnpath",
            "type": "`$OBJECT`",
          },
          {
            "name": "spf",
            "type": "`$OBJECT`",
          },
          {
            "name": "valid",
            "type": "`$BOOLEAN`",
          },
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/email/v1/domains/{id}",
                "parts": [
                  "email",
                  "v1",
                  "domains",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "type": "`$BOOLEAN`",
          },
          {
            "name": "dmarc_status",
            "type": "`$STRING`",
          },
          {
            "name": "domain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "productId",
            "type": "`$STRING`",
          },
          {
            "name": "returnpath_status",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "spf_status",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "valid",
            "type": "`$BOOLEAN`",
          },
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "size",
                      "orig": "size",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/email/v1/domains",
                "parts": [
                  "email",
                  "v1",
                  "domains",
                ],
                "select": {
                  "exist": [
                    "page",
                    "size",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "domain_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/email/v1/domains/{id}/verify",
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
                "select": {
                  "exist": [
                    "domain_id",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "domain",
            ],
          ],
        },
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/email/v1/domains/{id}",
                "parts": [
                  "email",
                  "v1",
                  "domains",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/email/v1/messages",
                "parts": [
                  "email",
                  "v1",
                  "messages",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
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
