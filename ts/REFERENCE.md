# LmEmail TypeScript SDK Reference

Complete API reference for the LmEmail TypeScript SDK.


## LmEmailSDK

### Constructor

```ts
new LmEmailSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmEmailSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LmEmailSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LmEmailSDK` instance in test mode.


### Instance Methods

#### `EmailCreateDomain(data?: object)`

Create a new `EmailCreateDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailCreateDomainEntity` instance.

#### `EmailDomainDetail(data?: object)`

Create a new `EmailDomainDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailDomainDetailEntity` instance.

#### `EmailDomainList(data?: object)`

Create a new `EmailDomainList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailDomainListEntity` instance.

#### `EmailDomainVerify(data?: object)`

Create a new `EmailDomainVerify` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EmailDomainVerifyEntity` instance.

#### `ManageDomain(data?: object)`

Create a new `ManageDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ManageDomainEntity` instance.

#### `SendMessage(data?: object)`

Create a new `SendMessage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SendMessageEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LmEmailSDK.test()`.

**Returns:** `LmEmailSDK` instance in test mode.


---

## EmailCreateDomainEntity

```ts
const email_create_domain = client.EmailCreateDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes | Domain address |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.EmailCreateDomain().create({
  domain: 'example_domain',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailCreateDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmEmailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailDomainDetailEntity

```ts
const email_domain_detail = client.EmailDomainDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim` | `Record<string, any>` | No |  |
| `dmarc` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `number` | No |  |
| `returnpath` | `Record<string, any>` | No |  |
| `spf` | `Record<string, any>` | No |  |
| `valid` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EmailDomainDetail().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailDomainDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmEmailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailDomainListEntity

```ts
const email_domain_list = client.EmailDomainList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim_status` | `boolean` | No |  |
| `dmarc_status` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `number` | No |  |
| `productId` | `string` | No |  |
| `returnpath_status` | `boolean` | No |  |
| `spf_status` | `boolean` | No |  |
| `valid` | `boolean` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.EmailDomainList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailDomainListEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmEmailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EmailDomainVerifyEntity

```ts
const email_domain_verify = client.EmailDomainVerify()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.EmailDomainVerify().load({ domain_id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EmailDomainVerifyEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmEmailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ManageDomainEntity

```ts
const manage_domain = client.ManageDomain()
```

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ManageDomain().remove({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ManageDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmEmailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SendMessageEntity

```ts
const send_message = client.SendMessage()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.SendMessage().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SendMessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `LmEmailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LmEmailSDK({
  feature: {
    test: { active: true },
  }
})
```

