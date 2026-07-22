# LmEmail SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

LmEmailUtility.registrar = ->(u) {
  u.clean = LmEmailUtilities::Clean
  u.done = LmEmailUtilities::Done
  u.make_error = LmEmailUtilities::MakeError
  u.feature_add = LmEmailUtilities::FeatureAdd
  u.feature_hook = LmEmailUtilities::FeatureHook
  u.feature_init = LmEmailUtilities::FeatureInit
  u.fetcher = LmEmailUtilities::Fetcher
  u.make_fetch_def = LmEmailUtilities::MakeFetchDef
  u.make_context = LmEmailUtilities::MakeContext
  u.make_options = LmEmailUtilities::MakeOptions
  u.make_request = LmEmailUtilities::MakeRequest
  u.make_response = LmEmailUtilities::MakeResponse
  u.make_result = LmEmailUtilities::MakeResult
  u.make_point = LmEmailUtilities::MakePoint
  u.make_spec = LmEmailUtilities::MakeSpec
  u.make_url = LmEmailUtilities::MakeUrl
  u.param = LmEmailUtilities::Param
  u.prepare_auth = LmEmailUtilities::PrepareAuth
  u.prepare_body = LmEmailUtilities::PrepareBody
  u.prepare_headers = LmEmailUtilities::PrepareHeaders
  u.prepare_method = LmEmailUtilities::PrepareMethod
  u.prepare_params = LmEmailUtilities::PrepareParams
  u.prepare_path = LmEmailUtilities::PreparePath
  u.prepare_query = LmEmailUtilities::PrepareQuery
  u.result_basic = LmEmailUtilities::ResultBasic
  u.result_body = LmEmailUtilities::ResultBody
  u.result_headers = LmEmailUtilities::ResultHeaders
  u.transform_request = LmEmailUtilities::TransformRequest
  u.transform_response = LmEmailUtilities::TransformResponse
}
