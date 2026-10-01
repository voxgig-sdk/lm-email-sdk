# Provenance of the API definition

`email-openapi.json` is LINK Mobility's published definition of the MyLINK
Email API, copied byte for byte. Nothing in it has been changed.

| | |
|---|---|
| Vendor file | `MyLINK-Email-API.json` |
| Source URL | https://docs.linkmobility.com/api/specs/file/MyLINK-Email-API.json |
| Rendered at | https://docs.linkmobility.com/api-reference/mylink-email-api (the page's current version is this file) |
| Retrieved | 2026-10-01T18:39:51Z |
| Portal upload time | 2026-04-26T09:11:31Z (`updatedAt` in the docs portal's spec listing) |
| SHA-256 | `3d0093d1947ef8fc3543aed95cf2b15b438dba71df1aa1e14220d86d89baa206` |
| Size | 74,904 bytes |
| Format | OpenAPI 3.1.0, title "MyLINK EMAIL API", version `v1` |
| Counts | 4 paths, 6 operations, 50 component schemas |
| Server | `https://api.linkmobility.com` |
| Auth | OAuth2 client credentials; token URL `https://sso.linkmobility.com/auth/realms/CPaaS/protocol/openid-connect/token` |
| Licence | The definition declares none (`info.license` is absent). It is published openly on LINK Mobility's developer portal. Publishing this SDK was approved by Richard Rodger on 2026-10-01. |

## Changes

None to the file. Entity corrections, if any are ever needed, belong in
`.sdk/model/guide/guide.aontu`, never in this file.

## A newer upload is waiting on the portal

The portal also holds `MyLINK-Email-API-1.json`, uploaded 2026-09-29 and not
yet the version the reference page renders. It differs from this file only in
the host: `https://mail.linkmobility.com` instead of
`https://api.linkmobility.com`, in `servers` and in every code sample.
If the reference page switches to it, take that file and regenerate.
