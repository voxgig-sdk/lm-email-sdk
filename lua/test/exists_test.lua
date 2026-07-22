-- LmEmail SDK exists test

local sdk = require("lm-email_sdk")

describe("LmEmailSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
