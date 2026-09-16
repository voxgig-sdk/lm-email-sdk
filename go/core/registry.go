package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewEmailCreateDomainEntityFunc func(client *LmEmailSDK, entopts map[string]any) LmEmailEntity

var NewEmailDomainDetailEntityFunc func(client *LmEmailSDK, entopts map[string]any) LmEmailEntity

var NewEmailDomainListEntityFunc func(client *LmEmailSDK, entopts map[string]any) LmEmailEntity

var NewEmailDomainVerifyEntityFunc func(client *LmEmailSDK, entopts map[string]any) LmEmailEntity

var NewManageDomainEntityFunc func(client *LmEmailSDK, entopts map[string]any) LmEmailEntity

var NewSendMessageEntityFunc func(client *LmEmailSDK, entopts map[string]any) LmEmailEntity

