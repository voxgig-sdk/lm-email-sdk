# LmEmail Golang SDK Reference

Complete API reference for the LmEmail Golang SDK.


## LmEmailSDK

### Constructor

```go
func NewLmEmailSDK(options map[string]any) *LmEmailSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *LmEmailSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *LmEmailSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `EmailCreateDomain(data map[string]any) LmEmailEntity`

Create a new `EmailCreateDomain` entity instance. Pass `nil` for no initial data.

#### `EmailDomainDetail(data map[string]any) LmEmailEntity`

Create a new `EmailDomainDetail` entity instance. Pass `nil` for no initial data.

#### `EmailDomainList(data map[string]any) LmEmailEntity`

Create a new `EmailDomainList` entity instance. Pass `nil` for no initial data.

#### `EmailDomainVerify(data map[string]any) LmEmailEntity`

Create a new `EmailDomainVerify` entity instance. Pass `nil` for no initial data.

#### `ManageDomain(data map[string]any) LmEmailEntity`

Create a new `ManageDomain` entity instance. Pass `nil` for no initial data.

#### `SendMessage(data map[string]any) LmEmailEntity`

Create a new `SendMessage` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## EmailCreateDomainEntity

```go
emailCreateDomain := client.EmailCreateDomain(nil)
fmt.Println(emailCreateDomain.GetName()) // "email_create_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.EmailCreateDomain(nil).Create(map[string]any{
    "domain": "example_domain",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailCreateDomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EmailDomainDetailEntity

```go
emailDomainDetail := client.EmailDomainDetail(nil)
fmt.Println(emailDomainDetail.GetName()) // "email_domain_detail"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim` | `map[string]any` | No |  |
| `dmarc` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `int` | No |  |
| `return_path` | `map[string]any` | No |  |
| `spf` | `map[string]any` | No |  |
| `valid` | `bool` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EmailDomainDetail(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailDomainDetailEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EmailDomainListEntity

```go
emailDomainList := client.EmailDomainList(nil)
fmt.Println(emailDomainList.GetName()) // "email_domain_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim_status` | `bool` | No |  |
| `dmarc_status` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `int` | No |  |
| `product_id` | `string` | No |  |
| `return_path_status` | `bool` | No |  |
| `spf_status` | `bool` | No |  |
| `valid` | `bool` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.EmailDomainList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailDomainListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EmailDomainVerifyEntity

```go
emailDomainVerify := client.EmailDomainVerify(nil)
fmt.Println(emailDomainVerify.GetName()) // "email_domain_verify"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.EmailDomainVerify(nil).Load(map[string]any{"domain_id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EmailDomainVerifyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ManageDomainEntity

```go
manageDomain := client.ManageDomain(nil)
fmt.Println(manageDomain.GetName()) // "manage_domain"
```

### Operations

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.ManageDomain(nil).Remove(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ManageDomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SendMessageEntity

```go
sendMessage := client.SendMessage(nil)
fmt.Println(sendMessage.GetName()) // "send_message"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.SendMessage(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SendMessageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewLmEmailSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

