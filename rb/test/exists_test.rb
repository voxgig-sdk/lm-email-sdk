# LmEmail SDK exists test

require "minitest/autorun"
require_relative "../LmEmail_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LmEmailSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
