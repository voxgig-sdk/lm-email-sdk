# LmEmail Python SDK Reference

Complete API reference for the LmEmail Python SDK.


## LmEmailSDK

### Constructor

```python
from lmemail_sdk import LmEmailSDK

client = LmEmailSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LmEmailSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = LmEmailSDK.test()
```


### Instance Methods

#### `EmailCreateDomain(data=None)`

Create a new `EmailCreateDomainEntity` instance. Pass `None` for no initial data.

#### `EmailDomainDetail(data=None)`

Create a new `EmailDomainDetailEntity` instance. Pass `None` for no initial data.

#### `EmailDomainList(data=None)`

Create a new `EmailDomainListEntity` instance. Pass `None` for no initial data.

#### `EmailDomainVerify(data=None)`

Create a new `EmailDomainVerifyEntity` instance. Pass `None` for no initial data.

#### `ManageDomain(data=None)`

Create a new `ManageDomainEntity` instance. Pass `None` for no initial data.

#### `SendMessage(data=None)`

Create a new `SendMessageEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## EmailCreateDomainEntity

```python
email_create_domain = client.EmailCreateDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.EmailCreateDomain().create({
    "domain": "example_domain",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailCreateDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailDomainDetailEntity

```python
email_domain_detail = client.EmailDomainDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim` | `dict` | No |  |
| `dmarc` | `str` | No |  |
| `domain` | `str` | No |  |
| `id` | `int` | No |  |
| `returnpath` | `dict` | No |  |
| `spf` | `dict` | No |  |
| `valid` | `bool` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EmailDomainDetail().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailDomainDetailEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailDomainListEntity

```python
email_domain_list = client.EmailDomainList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `dkim_status` | `bool` | No |  |
| `dmarc_status` | `str` | No |  |
| `domain` | `str` | No |  |
| `id` | `int` | No |  |
| `productId` | `str` | No |  |
| `returnpath_status` | `bool` | No |  |
| `spf_status` | `bool` | No |  |
| `valid` | `bool` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.EmailDomainList().list()
for email_domain_list in results:
    print(email_domain_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailDomainListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EmailDomainVerifyEntity

```python
email_domain_verify = client.EmailDomainVerify()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.EmailDomainVerify().load({"domain_id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EmailDomainVerifyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ManageDomainEntity

```python
manage_domain = client.ManageDomain()
```

### Operations

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ManageDomain().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ManageDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SendMessageEntity

```python
send_message = client.SendMessage()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.SendMessage().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SendMessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = LmEmailSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

