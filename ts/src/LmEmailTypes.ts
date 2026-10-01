// Typed models for the LmEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface EmailDomainDetail {
  dkim?: Record<string, any>
  dkim_status?: boolean
  dmarc?: string
  dmarc_status?: string
  domain?: string
  id?: number
  productId?: string
  returnpath?: Record<string, any>
  returnpath_status?: boolean
  spf?: Record<string, any>
  spf_status?: boolean
  valid?: boolean
}

export interface EmailDomainDetailLoadMatch {
  id: number
}

export interface EmailDomainDetailListMatch {
  page: number
  size: number
}

export interface EmailDomainDetailCreateData {
  dkim?: Record<string, any>
  dkim_status?: boolean
  dmarc?: string
  dmarc_status?: string
  domain?: string
  id?: number
  productId?: string
  returnpath?: Record<string, any>
  returnpath_status?: boolean
  spf?: Record<string, any>
  spf_status?: boolean
  valid?: boolean
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
  messages?: any[]
  requestId?: string
}

export interface SendMessageCreateData {
  messages?: any[]
  requestId?: string
}

