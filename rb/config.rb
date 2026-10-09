# LmEmail SDK configuration

module LmEmailConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "LmEmail",
        "slug" => "lm-email",
        "version" => "0.1.2",
        "target" => "rb",
      },
      "feature" => {
        "debug" => {
          "options" => {
            "active" => false,
            "max" => 100,
            "redact" => [
              "authorization",
              "cookie",
              "set-cookie",
              "api-key",
              "apikey",
              "x-api-key",
              "idempotency-key",
            ],
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "onEntry" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "none",
        },
        "idempotency" => {
          "options" => {
            "active" => false,
            "header" => "Idempotency-Key",
            "methods" => [
              "POST",
              "PUT",
              "PATCH",
              "DELETE",
            ],
            "ops" => [
              "create",
              "update",
              "remove",
            ],
          },
          "optspec" => {
            "keygen" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "none",
        },
        "metrics" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "none",
        },
        "paging" => {
          "options" => {
            "active" => false,
            "afterVar" => "after",
            "cursorParam" => "cursor",
            "firstVar" => "first",
            "limitParam" => "limit",
            "pageParam" => "page",
            "startPage" => 1,
          },
          "optspec" => {
            "limit" => "`$NUMBER`",
            "ops" => "`$LIST`",
          },
          "strict" => false,
          "transport" => "none",
        },
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api.linkmobility.com",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "email_domain_detail" => {},
          "email_domain_verify" => {},
          "manage_domain" => {},
          "send_message" => {},
        },
      },
      "entity" => {
        "email_domain_detail" => {
          "fields" => [
            {
              "name" => "dkim",
              "title" => "Dkim",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "dkim_status",
              "title" => "Dkim Status",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "dmarc",
              "title" => "Dmarc",
              "type" => "`$STRING`",
            },
            {
              "name" => "dmarc_status",
              "title" => "Dmarc Status",
              "type" => "`$STRING`",
            },
            {
              "name" => "domain",
              "title" => "Domain",
              "type" => "`$STRING`",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "Domain address",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "productId",
              "title" => "Product Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "returnpath",
              "title" => "Returnpath",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "returnpath_status",
              "title" => "Returnpath Status",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "spf",
              "title" => "Spf",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "spf_status",
              "title" => "Spf Status",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "valid",
              "title" => "Valid",
              "type" => "`$BOOLEAN`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "email_domain_detail",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/email/v1/domains",
                  "segments" => [
                    {
                      "lit" => "email",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "domains",
                    },
                  ],
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => {
                      "domain" => "`reqdata.domain`",
                    },
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/email/v1/domains",
                  "segments" => [
                    {
                      "lit" => "email",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "domains",
                    },
                  ],
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.items`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "size",
                        "orig" => "size",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "page",
                      "size",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/email/v1/domains/{id}",
                  "segments" => [
                    {
                      "lit" => "email",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "domains",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "email_domain_verify" => {
          "fields" => [],
          "name" => "email_domain_verify",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/email/v1/domains/{id}/verify",
                  "segments" => [
                    {
                      "lit" => "email",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "domains",
                    },
                    {
                      "var" => "domain_id",
                    },
                    {
                      "lit" => "verify",
                    },
                  ],
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                    "{domain_id}",
                    "verify",
                  ],
                  "rename" => {
                    "param" => {
                      "id" => "domain_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "domain_id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "domain_id",
                      "type",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "manage_domain" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "manage_domain",
          "op" => {
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/email/v1/domains/{id}",
                  "segments" => [
                    {
                      "lit" => "email",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "domains",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "send_message" => {
          "fields" => [
            {
              "name" => "messages",
              "title" => "Messages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "requestId",
              "title" => "Request Id",
              "type" => "`$STRING`",
              "format" => "uuid",
            },
          ],
          "name" => "send_message",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/email/v1/messages",
                  "segments" => [
                    {
                      "lit" => "email",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "messages",
                    },
                  ],
                  "parts" => [
                    "email",
                    "v1",
                    "messages",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata.messages`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    LmEmailFeatures.make_feature(name)
  end
end
