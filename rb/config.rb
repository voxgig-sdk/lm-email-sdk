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
        "version" => "0.1.1",
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
          "email_create_domain" => {},
          "email_domain_detail" => {},
          "email_domain_list" => {},
          "email_domain_verify" => {},
          "manage_domain" => {},
          "send_message" => {},
        },
      },
      "entity" => {
        "email_create_domain" => {
          "fields" => [
            {
              "name" => "domain",
              "req" => true,
              "short" => "Domain address",
              "type" => "`$STRING`",
            },
          ],
          "name" => "email_create_domain",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
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
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "domain" => "`reqdata.domain`",
                    },
                    "res" => "`body`",
                  },
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "email_domain_detail" => {
          "fields" => [
            {
              "name" => "dkim",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "dmarc",
              "type" => "`$STRING`",
            },
            {
              "name" => "domain",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "returnpath",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "spf",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "valid",
              "type" => "`$BOOLEAN`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "email_domain_detail",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "email_domain_list" => {
          "fields" => [
            {
              "name" => "dkim_status",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "dmarc_status",
              "type" => "`$STRING`",
            },
            {
              "name" => "domain",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "productId",
              "type" => "`$STRING`",
            },
            {
              "name" => "returnpath_status",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "spf_status",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "valid",
              "type" => "`$BOOLEAN`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "email_domain_list",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "size",
                        "orig" => "size",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "page",
                      "size",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.items`",
                  },
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                  ],
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
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "domain_id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "type",
                        "orig" => "type",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/email/v1/domains/{id}/verify",
                  "rename" => {
                    "param" => {
                      "id" => "domain_id",
                    },
                  },
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
                  "select" => {
                    "exist" => [
                      "domain_id",
                      "type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                    "{domain_id}",
                    "verify",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "domain",
              ],
            ],
          },
        },
        "manage_domain" => {
          "fields" => [
            {
              "name" => "id",
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
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "email",
                    "v1",
                    "domains",
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "send_message" => {
          "fields" => [],
          "name" => "send_message",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
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
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "email",
                    "v1",
                    "messages",
                  ],
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
