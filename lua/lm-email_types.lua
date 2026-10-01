-- Typed models for the LmEmail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class EmailDomainDetail
---@field dkim? table
---@field dkim_status? boolean
---@field dmarc? string
---@field dmarc_status? string
---@field domain? string
---@field id? number
---@field productId? string
---@field returnpath? table
---@field returnpath_status? boolean
---@field spf? table
---@field spf_status? boolean
---@field valid? boolean

---@class EmailDomainDetailLoadMatch
---@field id number

---@class EmailDomainDetailListMatch
---@field page number
---@field size number

---@class EmailDomainDetailCreateData
---@field dkim? table
---@field dkim_status? boolean
---@field dmarc? string
---@field dmarc_status? string
---@field domain? string
---@field id? number
---@field productId? string
---@field returnpath? table
---@field returnpath_status? boolean
---@field spf? table
---@field spf_status? boolean
---@field valid? boolean

---@class EmailDomainVerify

---@class EmailDomainVerifyLoadMatch
---@field domain_id number
---@field type string

---@class ManageDomain
---@field id? string

---@class ManageDomainRemoveMatch
---@field id number

---@class SendMessage
---@field messages? table
---@field requestId? string

---@class SendMessageCreateData
---@field messages? table
---@field requestId? string

local M = {}

return M
