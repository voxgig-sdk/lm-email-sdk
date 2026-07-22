package voxgiglmemailsdk

import (
	"github.com/voxgig-sdk/lm-email-sdk/go/core"
	"github.com/voxgig-sdk/lm-email-sdk/go/entity"
	"github.com/voxgig-sdk/lm-email-sdk/go/feature"
	_ "github.com/voxgig-sdk/lm-email-sdk/go/utility"
)

// Type aliases preserve external API.
type LmEmailSDK = core.LmEmailSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LmEmailEntity = core.LmEmailEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LmEmailError = core.LmEmailError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewEmailCreateDomainEntityFunc = func(client *core.LmEmailSDK, entopts map[string]any) core.LmEmailEntity {
		return entity.NewEmailCreateDomainEntity(client, entopts)
	}
	core.NewEmailDomainDetailEntityFunc = func(client *core.LmEmailSDK, entopts map[string]any) core.LmEmailEntity {
		return entity.NewEmailDomainDetailEntity(client, entopts)
	}
	core.NewEmailDomainListEntityFunc = func(client *core.LmEmailSDK, entopts map[string]any) core.LmEmailEntity {
		return entity.NewEmailDomainListEntity(client, entopts)
	}
	core.NewEmailDomainVerifyEntityFunc = func(client *core.LmEmailSDK, entopts map[string]any) core.LmEmailEntity {
		return entity.NewEmailDomainVerifyEntity(client, entopts)
	}
	core.NewManageDomainEntityFunc = func(client *core.LmEmailSDK, entopts map[string]any) core.LmEmailEntity {
		return entity.NewManageDomainEntity(client, entopts)
	}
	core.NewSendMessageEntityFunc = func(client *core.LmEmailSDK, entopts map[string]any) core.LmEmailEntity {
		return entity.NewSendMessageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLmEmailSDK = core.NewLmEmailSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLmEmailSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LmEmailSDK  { return NewLmEmailSDK(nil) }
func Test() *LmEmailSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
