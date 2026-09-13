# Typed models for the LmEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class EmailCreateDomain(TypedDict):
    domain: str


class EmailCreateDomainCreateData(TypedDict):
    domain: str


class EmailDomainDetail(TypedDict, total=False):
    dkim: dict
    dmarc: str
    domain: str
    id: int
    returnpath: dict
    spf: dict
    valid: bool


class EmailDomainDetailLoadMatch(TypedDict):
    id: int


class EmailDomainList(TypedDict, total=False):
    dkim_status: bool
    dmarc_status: str
    domain: str
    id: int
    productId: str
    returnpath_status: bool
    spf_status: bool
    valid: bool


class EmailDomainListListMatch(TypedDict):
    page: int
    size: int


class EmailDomainVerify(TypedDict):
    pass


class EmailDomainVerifyLoadMatch(TypedDict):
    domain_id: int
    type: str


class ManageDomain(TypedDict, total=False):
    id: str


class ManageDomainRemoveMatch(TypedDict):
    id: int


class SendMessage(TypedDict):
    pass


class SendMessageCreateData(TypedDict):
    pass
