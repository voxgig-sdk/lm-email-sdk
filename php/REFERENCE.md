# LmEmail PHP SDK Reference

Complete API reference for the LmEmail PHP SDK.


## LmEmailSDK

### Constructor

```php
require_once __DIR__ . '/lmemail_sdk.php';

$client = new LmEmailSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmEmailSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LmEmailSDK::test();
```


### Instance Methods

#### `EmailCreateDomain($data = null)`

Create a new `EmailCreateDomainEntity` instance. Pass `null` for no initial data.

#### `EmailDomainDetail($data = null)`

Create a new `EmailDomainDetailEntity` instance. Pass `null` for no initial data.

#### `EmailDomainList($data = null)`

Create a new `EmailDomainListEntity` instance. Pass `null` for no initial data.

#### `EmailDomainVerify($data = null)`

Create a new `EmailDomainVerifyEntity` instance. Pass `null` for no initial data.

#### `ManageDomain($data = null)`

Create a new `ManageDomainEntity` instance. Pass `null` for no initial data.

#### `SendMessage($data = null)`

Create a new `SendMessageEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LmEmailUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## EmailCreateDomainEntity

```php
$email_create_domain = $client->EmailCreateDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes | Domain address |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->EmailCreateDomain()->create([
  "domain" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailCreateDomainEntity`

Create a new `EmailCreateDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailDomainDetailEntity

```php
$email_domain_detail = $client->EmailDomainDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim` | `array` | No |  |
| `dmarc` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `int` | No |  |
| `returnpath` | `array` | No |  |
| `spf` | `array` | No |  |
| `valid` | `bool` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EmailDomainDetail()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailDomainDetailEntity`

Create a new `EmailDomainDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailDomainListEntity

```php
$email_domain_list = $client->EmailDomainList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim_status` | `bool` | No |  |
| `dmarc_status` | `string` | No |  |
| `domain` | `string` | No |  |
| `id` | `int` | No |  |
| `productId` | `string` | No |  |
| `returnpath_status` | `bool` | No |  |
| `spf_status` | `bool` | No |  |
| `valid` | `bool` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->EmailDomainList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailDomainListEntity`

Create a new `EmailDomainListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EmailDomainVerifyEntity

```php
$email_domain_verify = $client->EmailDomainVerify();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->EmailDomainVerify()->load(["domain_id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EmailDomainVerifyEntity`

Create a new `EmailDomainVerifyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ManageDomainEntity

```php
$manage_domain = $client->ManageDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->ManageDomain()->remove(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ManageDomainEntity`

Create a new `ManageDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SendMessageEntity

```php
$send_message = $client->SendMessage();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->SendMessage()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SendMessageEntity`

Create a new `SendMessageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LmEmailSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

