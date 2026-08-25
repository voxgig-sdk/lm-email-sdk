# frozen_string_literal: true

# Typed models for the LmEmail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# EmailCreateDomain entity data model.
#
# @!attribute [rw] domain
#   @return [String]
EmailCreateDomain = Struct.new(
  :domain,
  keyword_init: true
)

# Request payload for EmailCreateDomain#create.
#
# @!attribute [rw] domain
#   @return [String]
EmailCreateDomainCreateData = Struct.new(
  :domain,
  keyword_init: true
)

# EmailDomainDetail entity data model.
#
# @!attribute [rw] dkim
#   @return [Hash, nil]
#
# @!attribute [rw] dmarc
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] returnpath
#   @return [Hash, nil]
#
# @!attribute [rw] spf
#   @return [Hash, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
EmailDomainDetail = Struct.new(
  :dkim,
  :dmarc,
  :domain,
  :id,
  :returnpath,
  :spf,
  :valid,
  keyword_init: true
)

# Request payload for EmailDomainDetail#load.
#
# @!attribute [rw] id
#   @return [Integer]
EmailDomainDetailLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# EmailDomainList entity data model.
#
# @!attribute [rw] dkim_status
#   @return [Boolean, nil]
#
# @!attribute [rw] dmarc_status
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] productId
#   @return [String, nil]
#
# @!attribute [rw] returnpath_status
#   @return [Boolean, nil]
#
# @!attribute [rw] spf_status
#   @return [Boolean, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
EmailDomainList = Struct.new(
  :dkim_status,
  :dmarc_status,
  :domain,
  :id,
  :productId,
  :returnpath_status,
  :spf_status,
  :valid,
  keyword_init: true
)

# Request payload for EmailDomainList#list.
#
# @!attribute [rw] dkim_status
#   @return [Boolean, nil]
#
# @!attribute [rw] dmarc_status
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] productId
#   @return [String, nil]
#
# @!attribute [rw] returnpath_status
#   @return [Boolean, nil]
#
# @!attribute [rw] spf_status
#   @return [Boolean, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
EmailDomainListListMatch = Struct.new(
  :dkim_status,
  :dmarc_status,
  :domain,
  :id,
  :productId,
  :returnpath_status,
  :spf_status,
  :valid,
  keyword_init: true
)

# EmailDomainVerify entity data model.
class EmailDomainVerify
end

# Request payload for EmailDomainVerify#load.
#
# @!attribute [rw] domain_id
#   @return [Integer]
EmailDomainVerifyLoadMatch = Struct.new(
  :domain_id,
  keyword_init: true
)

# ManageDomain entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
ManageDomain = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for ManageDomain#remove.
#
# @!attribute [rw] id
#   @return [Integer]
ManageDomainRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# SendMessage entity data model.
class SendMessage
end

# Request payload for SendMessage#create.
class SendMessageCreateData
end

