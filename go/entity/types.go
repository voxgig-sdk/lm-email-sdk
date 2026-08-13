// Typed models for the LmEmail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/lm-email-sdk/go/core"
)

// EmailCreateDomain is the typed data model for the email_create_domain entity.
type EmailCreateDomain struct {
	Domain string `json:"domain"`
}

// EmailCreateDomainCreateData is the typed request payload for EmailCreateDomain.CreateTyped.
type EmailCreateDomainCreateData struct {
	Domain string `json:"domain"`
}

// EmailDomainDetail is the typed data model for the email_domain_detail entity.
type EmailDomainDetail struct {
	Dkim *map[string]any `json:"dkim,omitempty"`
	Dmarc *string `json:"dmarc,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Id *int `json:"id,omitempty"`
	Returnpath *map[string]any `json:"returnpath,omitempty"`
	Spf *map[string]any `json:"spf,omitempty"`
	Valid *bool `json:"valid,omitempty"`
}

// EmailDomainDetailLoadMatch is the typed request payload for EmailDomainDetail.LoadTyped.
type EmailDomainDetailLoadMatch struct {
	Id int `json:"id"`
}

// EmailDomainList is the typed data model for the email_domain_list entity.
type EmailDomainList struct {
	DkimStatus *bool `json:"dkim_status,omitempty"`
	DmarcStatus *string `json:"dmarc_status,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Id *int `json:"id,omitempty"`
	ProductId *string `json:"productId,omitempty"`
	ReturnpathStatus *bool `json:"returnpath_status,omitempty"`
	SpfStatus *bool `json:"spf_status,omitempty"`
	Valid *bool `json:"valid,omitempty"`
}

// EmailDomainListListMatch is the typed request payload for EmailDomainList.ListTyped.
type EmailDomainListListMatch struct {
	DkimStatus *bool `json:"dkim_status,omitempty"`
	DmarcStatus *string `json:"dmarc_status,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Id *int `json:"id,omitempty"`
	ProductId *string `json:"productId,omitempty"`
	ReturnpathStatus *bool `json:"returnpath_status,omitempty"`
	SpfStatus *bool `json:"spf_status,omitempty"`
	Valid *bool `json:"valid,omitempty"`
}

// EmailDomainVerify is the typed data model for the email_domain_verify entity.
type EmailDomainVerify struct {
}

// EmailDomainVerifyLoadMatch is the typed request payload for EmailDomainVerify.LoadTyped.
type EmailDomainVerifyLoadMatch struct {
	DomainId int `json:"domain_id"`
}

// ManageDomain is the typed data model for the manage_domain entity.
type ManageDomain struct {
}

// ManageDomainRemoveMatch is the typed request payload for ManageDomain.RemoveTyped.
type ManageDomainRemoveMatch struct {
	Id int `json:"id"`
}

// SendMessage is the typed data model for the send_message entity.
type SendMessage struct {
}

// SendMessageCreateData is the typed request payload for SendMessage.CreateTyped.
type SendMessageCreateData struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
