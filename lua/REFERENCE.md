# LmEmail Lua SDK Reference

Complete API reference for the LmEmail Lua SDK.


## LmEmailSDK

### Constructor

```lua
local sdk = require("lm-email_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `EmailCreateDomain(data)`

Create a new `EmailCreateDomain` entity instance. Pass `nil` for no initial data.

#### `EmailDomainDetail(data)`

Create a new `EmailDomainDetail` entity instance. Pass `nil` for no initial data.

#### `EmailDomainList(data)`

Create a new `EmailDomainList` entity instance. Pass `nil` for no initial data.

#### `EmailDomainVerify(data)`

Create a new `EmailDomainVerify` entity instance. Pass `nil` for no initial data.

#### `ManageDomain(data)`

Create a new `ManageDomain` entity instance. Pass `nil` for no initial data.

#### `SendMessage(data)`

Create a new `SendMessage` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## EmailCreateDomainEntity

```lua
local email_create_domain = client:EmailCreateDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:EmailCreateDomain():create({
  domain = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailCreateDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailDomainDetailEntity

```lua
local email_domain_detail = client:EmailDomainDetail(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim` | `table` | No |  |
| `dmarc` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `number` | No |  |
| `return_path` | `table` | No |  |
| `spf` | `table` | No |  |
| `valid` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:EmailDomainDetail():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailDomainDetailEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailDomainListEntity

```lua
local email_domain_list = client:EmailDomainList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim_status` | `boolean` | No |  |
| `dmarc_status` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `number` | No |  |
| `product_id` | `string` | No |  |
| `return_path_status` | `boolean` | No |  |
| `spf_status` | `boolean` | No |  |
| `valid` | `boolean` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:EmailDomainList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailDomainListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EmailDomainVerifyEntity

```lua
local email_domain_verify = client:EmailDomainVerify(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:EmailDomainVerify():load({ domain_id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailDomainVerifyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ManageDomainEntity

```lua
local manage_domain = client:ManageDomain(nil)
```

### Operations

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:ManageDomain():remove({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ManageDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SendMessageEntity

```lua
local send_message = client:SendMessage(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:SendMessage():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SendMessageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

