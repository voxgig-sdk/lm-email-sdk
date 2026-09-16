# LmEmail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LmEmailFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmEmailBaseFeature.new
    when "debug"
      LmEmailDebugFeature.new
    when "idempotency"
      LmEmailIdempotencyFeature.new
    when "metrics"
      LmEmailMetricsFeature.new
    when "paging"
      LmEmailPagingFeature.new
    when "ratelimit"
      LmEmailRatelimitFeature.new
    when "retry"
      LmEmailRetryFeature.new
    when "test"
      LmEmailTestFeature.new
    when "timeout"
      LmEmailTimeoutFeature.new
    else
      LmEmailBaseFeature.new
    end
  end
end
