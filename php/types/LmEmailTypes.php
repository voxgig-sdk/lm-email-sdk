<?php
declare(strict_types=1);

// Typed models for the LmEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** EmailDomainDetail entity data model. */
class EmailDomainDetail
{
    public ?array $dkim = null;
    public ?bool $dkim_status = null;
    public ?string $dmarc = null;
    public ?string $dmarc_status = null;
    public ?string $domain = null;
    public ?int $id = null;
    public ?string $productId = null;
    public ?array $returnpath = null;
    public ?bool $returnpath_status = null;
    public ?array $spf = null;
    public ?bool $spf_status = null;
    public ?bool $valid = null;
}

/** Request payload for EmailDomainDetail#load. */
class EmailDomainDetailLoadMatch
{
    public int $id;
}

/** Request payload for EmailDomainDetail#list. */
class EmailDomainDetailListMatch
{
    public int $page;
    public int $size;
}

/** Request payload for EmailDomainDetail#create. */
class EmailDomainDetailCreateData
{
    public ?array $dkim = null;
    public ?bool $dkim_status = null;
    public ?string $dmarc = null;
    public ?string $dmarc_status = null;
    public ?string $domain = null;
    public ?int $id = null;
    public ?string $productId = null;
    public ?array $returnpath = null;
    public ?bool $returnpath_status = null;
    public ?array $spf = null;
    public ?bool $spf_status = null;
    public ?bool $valid = null;
}

/** EmailDomainVerify entity data model. */
class EmailDomainVerify
{
}

/** Request payload for EmailDomainVerify#load. */
class EmailDomainVerifyLoadMatch
{
    public int $domain_id;
    public string $type;
}

/** ManageDomain entity data model. */
class ManageDomain
{
    public ?string $id = null;
}

/** Request payload for ManageDomain#remove. */
class ManageDomainRemoveMatch
{
    public int $id;
}

/** SendMessage entity data model. */
class SendMessage
{
    public ?array $messages = null;
    public ?string $requestId = null;
}

/** Request payload for SendMessage#create. */
class SendMessageCreateData
{
    public ?array $messages = null;
    public ?string $requestId = null;
}

