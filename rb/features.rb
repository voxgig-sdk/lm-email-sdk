# LmEmail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module LmEmailFeatures
  def self.make_feature(name)
    case name
    when "base"
      LmEmailBaseFeature.new
    when "test"
      LmEmailTestFeature.new
    else
      LmEmailBaseFeature.new
    end
  end
end
