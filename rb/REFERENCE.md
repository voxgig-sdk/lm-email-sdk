# LmEmail Ruby SDK Reference

Complete API reference for the LmEmail Ruby SDK.


## LmEmailSDK

### Constructor

```ruby
require_relative 'LmEmail_sdk'

client = LmEmailSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmEmailSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LmEmailSDK.test
```


### Instance Methods

#### `EmailCreateDomain(data = nil)`

Create a new `EmailCreateDomain` entity instance. Pass `nil` for no initial data.

#### `EmailDomainDetail(data = nil)`

Create a new `EmailDomainDetail` entity instance. Pass `nil` for no initial data.

#### `EmailDomainList(data = nil)`

Create a new `EmailDomainList` entity instance. Pass `nil` for no initial data.

#### `EmailDomainVerify(data = nil)`

Create a new `EmailDomainVerify` entity instance. Pass `nil` for no initial data.

#### `ManageDomain(data = nil)`

Create a new `ManageDomain` entity instance. Pass `nil` for no initial data.

#### `SendMessage(data = nil)`

Create a new `SendMessage` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## EmailCreateDomainEntity

```ruby
email_create_domain = client.EmailCreateDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.EmailCreateDomain.create({
  "domain" => "example_domain", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailCreateDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailDomainDetailEntity

```ruby
email_domain_detail = client.EmailDomainDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim` | `Hash` | No |  |
| `dmarc` | `String` | No |  |
| `domain` | `String` | No |  |
| `id` | `Integer` | No |  |
| `return_path` | `Hash` | No |  |
| `spf` | `Hash` | No |  |
| `valid` | `Boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.EmailDomainDetail.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailDomainDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailDomainListEntity

```ruby
email_domain_list = client.EmailDomainList
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim_status` | `Boolean` | No |  |
| `dmarc_status` | `String` | No |  |
| `domain` | `String` | No |  |
| `id` | `Integer` | No |  |
| `product_id` | `String` | No |  |
| `return_path_status` | `Boolean` | No |  |
| `spf_status` | `Boolean` | No |  |
| `valid` | `Boolean` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.EmailDomainList.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailDomainListEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EmailDomainVerifyEntity

```ruby
email_domain_verify = client.EmailDomainVerify
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.EmailDomainVerify.load({ "domain_id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EmailDomainVerifyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ManageDomainEntity

```ruby
manage_domain = client.ManageDomain
```

### Operations

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.ManageDomain.remove({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ManageDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SendMessageEntity

```ruby
send_message = client.SendMessage
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.SendMessage.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SendMessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = LmEmailSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

