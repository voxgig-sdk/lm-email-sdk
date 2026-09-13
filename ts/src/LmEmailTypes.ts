// Typed models for the LmEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface EmailCreateDomain {
  domain: string
}

export interface EmailCreateDomainCreateData {
  domain: string
}

export interface EmailDomainDetail {
  dkim?: Record<string, any>
  dmarc?: string
  domain?: string
  id?: number
  returnpath?: Record<string, any>
  spf?: Record<string, any>
  valid?: boolean
}

export interface EmailDomainDetailLoadMatch {
  id: number
}

export interface EmailDomainList {
  dkim_status?: boolean
  dmarc_status?: string
  domain?: string
  id?: number
  productId?: string
  returnpath_status?: boolean
  spf_status?: boolean
  valid?: boolean
}

export interface EmailDomainListListMatch {
  page: number
  size: number
}

export interface EmailDomainVerify {
}

export interface EmailDomainVerifyLoadMatch {
  domain_id: number
  type: string
}

export interface ManageDomain {
  id?: string
}

export interface ManageDomainRemoveMatch {
  id: number
}

export interface SendMessage {
}

export interface SendMessageCreateData {
}

