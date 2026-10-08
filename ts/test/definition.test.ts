import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "email_domain_detail",
    "accessor": "EmailDomainDetail",
    "op": "create",
    "method": "POST",
    "path": "/email/v1/domains",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "emailDomainId": 1
    },
    "idField": "id"
  },
  {
    "entity": "email_domain_detail",
    "accessor": "EmailDomainDetail",
    "op": "load",
    "method": "GET",
    "path": "/email/v1/domains/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "id": 1,
      "domain": "x",
      "dkim": {
        "host": "x",
        "txt": "x"
      },
      "spf": {
        "host": "x",
        "txt": "x",
        "ip4": "x"
      },
      "dmarc": "x",
      "return-path": {
        "host": "x",
        "txt": "x"
      },
      "valid": true
    },
    "idField": "id"
  },
  {
    "entity": "email_domain_list",
    "accessor": "EmailDomainList",
    "op": "list",
    "method": "GET",
    "path": "/email/v1/domains",
    "args": [],
    "select": {
      "page": "v1",
      "size": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "page",
      "size"
    ],
    "queryArgs": [
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "size",
        "wire": "size"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "results": 1,
      "resultsPerPage": 1,
      "pages": 1,
      "currentPage": 1,
      "items": [
        {
          "id": 1,
          "domain": "x",
          "spf_status": true,
          "dmarc_status": "x",
          "return-path_status": true,
          "dkim_status": true,
          "productId": "x",
          "valid": true
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "email_domain_verify",
    "accessor": "EmailDomainVerify",
    "op": "load",
    "method": "GET",
    "path": "/email/v1/domains/{id}/verify",
    "args": [
      {
        "name": "domain_id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {
      "type": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "type"
    ],
    "queryArgs": [
      {
        "name": "type",
        "wire": "type"
      }
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": "x",
    "idField": "id"
  },
  {
    "entity": "manage_domain",
    "accessor": "ManageDomain",
    "op": "remove",
    "method": "DELETE",
    "path": "/email/v1/domains/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 204,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "send_message",
    "accessor": "SendMessage",
    "op": "create",
    "method": "POST",
    "path": "/email/v1/messages",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 202,
    "sample": {
      "requestId": "x",
      "messages": [
        {
          "referenceId": "x",
          "recipient": {
            "to": [
              {
                "email": "x",
                "name": "x",
                "messageId": "x"
              }
            ],
            "cc": [
              {
                "email": "x",
                "name": "x",
                "messageId": "x"
              }
            ],
            "bcc": [
              {
                "email": "x",
                "name": "x",
                "messageId": "x"
              }
            ]
          }
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
