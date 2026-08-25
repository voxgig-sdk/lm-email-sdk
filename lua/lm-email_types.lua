-- Typed models for the LmEmail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class EmailCreateDomain
---@field domain string

---@class EmailCreateDomainCreateData
---@field domain string

---@class EmailDomainDetail
---@field dkim? table
---@field dmarc? string
---@field domain? string
---@field id? number
---@field returnpath? table
---@field spf? table
---@field valid? boolean

---@class EmailDomainDetailLoadMatch
---@field id number

---@class EmailDomainList
---@field dkim_status? boolean
---@field dmarc_status? string
---@field domain? string
---@field id? number
---@field productId? string
---@field returnpath_status? boolean
---@field spf_status? boolean
---@field valid? boolean

---@class EmailDomainListListMatch
---@field dkim_status? boolean
---@field dmarc_status? string
---@field domain? string
---@field id? number
---@field productId? string
---@field returnpath_status? boolean
---@field spf_status? boolean
---@field valid? boolean

---@class EmailDomainVerify

---@class EmailDomainVerifyLoadMatch
---@field domain_id number

---@class ManageDomain
---@field id? string

---@class ManageDomainRemoveMatch
---@field id number

---@class SendMessage

---@class SendMessageCreateData

local M = {}

return M
