<?php
declare(strict_types=1);

// LmEmail SDK configuration

class LmEmailConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "LmEmail",
                "slug" => "lm-email",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.linkmobility.com",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "email_create_domain" => [],
                    "email_domain_detail" => [],
                    "email_domain_list" => [],
                    "email_domain_verify" => [],
                    "manage_domain" => [],
                    "send_message" => [],
                ],
            ],
            "entity" => [
        'email_create_domain' => [
          'fields' => [
            [
              'name' => 'domain',
              'req' => true,
              'short' => 'Domain address',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'email_create_domain',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/email/v1/domains',
                  'parts' => [
                    'email',
                    'v1',
                    'domains',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'email_domain_detail' => [
          'fields' => [
            [
              'name' => 'dkim',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'dmarc',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'returnpath',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'spf',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'valid',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'email_domain_detail',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/email/v1/domains/{id}',
                  'parts' => [
                    'email',
                    'v1',
                    'domains',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'email_domain_list' => [
          'fields' => [
            [
              'name' => 'dkim_status',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'dmarc_status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'productId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'returnpath_status',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'spf_status',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'valid',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'email_domain_list',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'size',
                        'orig' => 'size',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/email/v1/domains',
                  'parts' => [
                    'email',
                    'v1',
                    'domains',
                  ],
                  'select' => [
                    'exist' => [
                      'page',
                      'size',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'email_domain_verify' => [
          'fields' => [],
          'name' => 'email_domain_verify',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'domain_id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/email/v1/domains/{id}/verify',
                  'parts' => [
                    'email',
                    'v1',
                    'domains',
                    '{domain_id}',
                    'verify',
                  ],
                  'rename' => [
                    'param' => [
                      'id' => 'domain_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'domain_id',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'domain',
              ],
            ],
          ],
        ],
        'manage_domain' => [
          'fields' => [],
          'name' => 'manage_domain',
          'op' => [
            'remove' => [
              'input' => 'data',
              'name' => 'remove',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'DELETE',
                  'orig' => '/email/v1/domains/{id}',
                  'parts' => [
                    'email',
                    'v1',
                    'domains',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'send_message' => [
          'fields' => [],
          'name' => 'send_message',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/email/v1/messages',
                  'parts' => [
                    'email',
                    'v1',
                    'messages',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return LmEmailFeatures::make_feature($name);
    }
}
