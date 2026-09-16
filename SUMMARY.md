# MyLINK EMAIL API

&lt;div&gt;&lt;h2&gt;Purpose and functionality&lt;/h2&gt; MyLINK EMAIL API is a REST-based API that supports sending email messages to the recipients you want to reach. &lt;h2&gt;Current supported functionality (high-level)&lt;/h2&gt;&lt;ul style=&quot;list-style:disc inside;&quot;&gt;&lt;li&gt;Send Simple Email&lt;/li&gt;&lt;li&gt;Send Email with attachments&lt;/li&gt;&lt;li&gt;Send Email with CC &amp; BCC&lt;/li&gt;&lt;/ul&gt;&lt;h2&gt;Generating credentials&lt;/h2&gt; To generate credentials for the rest API as well as the SMTP connection, head over to &lt;a href=&quot;https://mylink2.linkmobility.com/&quot;&gt;MyLINK&lt;/a&gt;. Simply go to the Messaging APIs page in the navigation menu, select the product and generate your credentials. &lt;h2&gt;Getting started&lt;/h2&gt; To maximise the deliverability of your emails first you need to make sure that your configuration is correctly set up. The following steps are crucial for the success of your integration:&lt;ul style=&quot;list-style-type:&#39;- &#39;&quot;&gt;&lt;li&gt;Add your Domain configuration via &lt;a href=&quot;https://mylink2.linkmobility.com/&quot;&gt;MyLINK&lt;/a&gt;: doing this will give you a DKIM signature that you must add to your DNS configuration.&lt;/li&gt;&lt;li&gt;Set up your Return-path: communication back to the email server is through the return-path, make sure to add our CNAME in order for us to receive requests.&lt;/li&gt;&lt;li&gt;Set up your SPF: this will set the mail servers that are allowed to send emails on behalf of your domain.&lt;/li&gt;&lt;li&gt;Add an MX Record: Make sure an email server is used on the domain and your sender address is an existing email address to maximize deliverability. This step is not mandatory for sending but it will increase the delivery rate&lt;/li&gt;&lt;/ul&gt;All needed values for the configuration can be found on the Messaging APIs page in MyLINK. Once ready, revisit the developer portal for how to send Emails. &lt;h2&gt;Limitations&lt;/h2&gt;&lt;ul style=&quot;list-style:disc inside;&quot;&gt;&lt;li&gt;Individual email messages sent through myLINK Email cannot exceed 15mb in size (attachments included) for API requests and 10mb for SMTP requests.&lt;/li&gt;&lt;li&gt;Multiple email messages can be sent via API in a single request up to a total of 1000 emails within 1 request, total request size cannot exceed 50mb&lt;/li&gt;&lt;/ul&gt; &lt;div&gt;

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 6 entities and 6 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [EmailCreateDomain](docs/api/email_create_domain.html)

Results: Created.

SDK operations: `create`.

Key fields to recognise:

- `domain`: Domain address

### [EmailDomainDetail](docs/api/email_domain_detail.html)

Results: Successful operation.

SDK operations: `load`.

### [EmailDomainList](docs/api/email_domain_list.html)

Results: Successful operation.

SDK operations: `list`.

### [EmailDomainVerify](docs/api/email_domain_verify.html)

Results: true/false.

SDK operations: `load`.

### [ManageDomain](docs/api/manage_domain.html)

Results: Deleted.

SDK operations: `remove`.

### [SendMessage](docs/api/send_message.html)

Results: Accepted.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [EmailCreateDomain](docs/api/email_create_domain.html) | `create` | `POST /email/v1/domains` | Required |
| [EmailDomainDetail](docs/api/email_domain_detail.html) | `load` | `GET /email/v1/domains/{id}` | Required |
| [EmailDomainList](docs/api/email_domain_list.html) | `list` | `GET /email/v1/domains` | Required |
| [EmailDomainVerify](docs/api/email_domain_verify.html) | `load` | `GET /email/v1/domains/{id}/verify` | Required |
| [ManageDomain](docs/api/manage_domain.html) | `remove` | `DELETE /email/v1/domains/{id}` | Required |
| [SendMessage](docs/api/send_message.html) | `create` | `POST /email/v1/messages` | Required |

## Connect to the API

- API server: `https://api.linkmobility.com`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Bearer token

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `lm-email_list`: List records for an entity. Supported entities: `email_domain_list`.
- `lm-email_load`: Load one record for an entity. Supported entities: `email_domain_detail`, `email_domain_verify`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

