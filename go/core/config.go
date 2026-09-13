package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LmEmail",
			"slug": "lm-email",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.linkmobility.com",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"email_create_domain": map[string]any{},
				"email_domain_detail": map[string]any{},
				"email_domain_list": map[string]any{},
				"email_domain_verify": map[string]any{},
				"manage_domain": map[string]any{},
				"send_message": map[string]any{},
			},
		},
		"entity": map[string]any{
			"email_create_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"req": true,
						"short": "Domain address",
						"type": "`$STRING`",
					},
				},
				"name": "email_create_domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/email/v1/domains",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"domain": "`reqdata.domain`",
									},
									"res": "`body`",
								},
								"parts": []any{
									"email",
									"v1",
									"domains",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_domain_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dkim",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "dmarc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "returnpath",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "spf",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "valid",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "email_domain_detail",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/email/v1/domains/{id}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"email",
									"v1",
									"domains",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_domain_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dkim_status",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "dmarc_status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "productId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "returnpath_status",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "spf_status",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "valid",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "email_domain_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "page",
											"orig": "page",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "size",
											"orig": "size",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/email/v1/domains",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page",
										"size",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"parts": []any{
									"email",
									"v1",
									"domains",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"email_domain_verify": map[string]any{
				"fields": []any{},
				"name": "email_domain_verify",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "domain_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/email/v1/domains/{id}/verify",
								"rename": map[string]any{
									"param": map[string]any{
										"id": "domain_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "domain_id",
									},
									map[string]any{
										"lit": "verify",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain_id",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"email",
									"v1",
									"domains",
									"{domain_id}",
									"verify",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"domain",
						},
					},
				},
			},
			"manage_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "manage_domain",
				"op": map[string]any{
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/email/v1/domains/{id}",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"email",
									"v1",
									"domains",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"send_message": map[string]any{
				"fields": []any{},
				"name": "send_message",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/email/v1/messages",
								"segments": []any{
									map[string]any{
										"lit": "email",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"email",
									"v1",
									"messages",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
