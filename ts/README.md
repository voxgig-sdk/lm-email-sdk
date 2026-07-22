# LmEmail TypeScript SDK



The TypeScript SDK for the LmEmail API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.EmailCreateDomain()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/lm-email-sdk/releases](https://github.com/voxgig-sdk/lm-email-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LmEmailSDK } from '@voxgig-sdk/lm-email'

const client = new LmEmailSDK({
  apikey: process.env.LM_EMAIL_APIKEY,
})
```

### 3. Load an emaildomainverify

EmailDomainVerify is nested under domain, so provide the `domain_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const emaildomainverify = await client.EmailDomainVerify().load({
    domain_id: 1,
  })
  console.log(emaildomainverify)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created EmailCreateDomain
const created = await client.EmailCreateDomain().create({
  domain: 'example_domain',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const emaildomaindetail = await client.EmailDomainDetail().load({ id: 1 })
  console.log(emaildomaindetail)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = LmEmailSDK.test()

const emaildomaindetail = await client.EmailDomainDetail().load({ id: 1 })
// emaildomaindetail is a bare entity populated with mock response data
console.log(emaildomaindetail)
```

You can also use the instance method:

```ts
const client = new LmEmailSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.EmailDomainDetail()

// First call runs the operation and stores its result
await entity.load({ id: 1 })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new LmEmailSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LM_EMAIL_TEST_LIVE=TRUE
LM_EMAIL_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### LmEmailSDK

#### Constructor

```ts
new LmEmailSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `EmailCreateDomain(data?)` | `EmailCreateDomainEntity` | Create an EmailCreateDomain entity instance. |
| `EmailDomainDetail(data?)` | `EmailDomainDetailEntity` | Create an EmailDomainDetail entity instance. |
| `EmailDomainList(data?)` | `EmailDomainListEntity` | Create an EmailDomainList entity instance. |
| `EmailDomainVerify(data?)` | `EmailDomainVerifyEntity` | Create an EmailDomainVerify entity instance. |
| `ManageDomain(data?)` | `ManageDomainEntity` | Create a ManageDomain entity instance. |
| `SendMessage(data?)` | `SendMessageEntity` | Create a SendMessage entity instance. |
| `tester(testopts?, sdkopts?)` | `LmEmailSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `LmEmailSDK.test(testopts?, sdkopts?)` | `LmEmailSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LmEmailSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### EmailCreateDomain

| Field | Description |
| --- | --- |
| `domain` |  |

Operations: create.

API path: `/email/v1/domains`

#### EmailDomainDetail

| Field | Description |
| --- | --- |
| `dkim` |  |
| `dmarc` |  |
| `domain` |  |
| `id` |  |
| `return_path` |  |
| `spf` |  |
| `valid` |  |

Operations: load.

API path: `/email/v1/domains/{id}`

#### EmailDomainList

| Field | Description |
| --- | --- |
| `dkim_status` |  |
| `dmarc_status` |  |
| `domain` |  |
| `id` |  |
| `product_id` |  |
| `return_path_status` |  |
| `spf_status` |  |
| `valid` |  |

Operations: list.

API path: `/email/v1/domains`

#### EmailDomainVerify

| Field | Description |
| --- | --- |

Operations: load.

API path: `/email/v1/domains/{id}/verify`

#### ManageDomain

| Field | Description |
| --- | --- |

Operations: remove.

API path: `/email/v1/domains/{id}`

#### SendMessage

| Field | Description |
| --- | --- |

Operations: create.

API path: `/email/v1/messages`



## Entities


### EmailCreateDomain

Create an instance: `const email_create_domain = client.EmailCreateDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |

#### Example: Create

```ts
const email_create_domain = await client.EmailCreateDomain().create({
  domain: 'example_domain',
})
```


### EmailDomainDetail

Create an instance: `const email_domain_detail = client.EmailDomainDetail()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dkim` | `Record<string, any>` |  |
| `dmarc` | `string` |  |
| `domain` | `string` |  |
| `id` | `number` |  |
| `return_path` | `Record<string, any>` |  |
| `spf` | `Record<string, any>` |  |
| `valid` | `boolean` |  |

#### Example: Load

```ts
const email_domain_detail = await client.EmailDomainDetail().load({ id: 1 })
```


### EmailDomainList

Create an instance: `const email_domain_list = client.EmailDomainList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `dkim_status` | `boolean` |  |
| `dmarc_status` | `string` |  |
| `domain` | `string` |  |
| `id` | `number` |  |
| `product_id` | `string` |  |
| `return_path_status` | `boolean` |  |
| `spf_status` | `boolean` |  |
| `valid` | `boolean` |  |

#### Example: List

```ts
const email_domain_lists = await client.EmailDomainList().list()
```


### EmailDomainVerify

Create an instance: `const email_domain_verify = client.EmailDomainVerify()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const email_domain_verify = await client.EmailDomainVerify().load({ domain_id: 1 })
```


### ManageDomain

Create an instance: `const manage_domain = client.ManageDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |


### SendMessage

Create an instance: `const send_message = client.SendMessage()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const send_message = await client.SendMessage().create({
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
lm-email/
├── src/
│   ├── LmEmailSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { LmEmailSDK } from '@voxgig-sdk/lm-email'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const emaildomaindetail = client.EmailDomainDetail()
await emaildomaindetail.load({ id: 1 })

// emaildomaindetail.data() now returns the emaildomaindetail data from the last `load`
// emaildomaindetail.match() returns { id: 1 }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
