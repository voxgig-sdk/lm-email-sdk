# EmailDomainVerify entity test

require "minitest/autorun"
require "json"
require_relative "../LmEmail_sdk"
require_relative "runner"

class EmailDomainVerifyEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = LmEmailSDK.test(nil, nil)
    ent = testsdk.EmailDomainVerify(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = LmEmailConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = LmEmailSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.EmailDomainVerify(nil).load({ "domain_id" => "x", "type" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = email_domain_verify_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    [].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "email_domain_verify." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    email_domain_verify_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.email_domain_verify")))
    email_domain_verify_ref01_data = nil
    if email_domain_verify_ref01_data_raw.length > 0
      email_domain_verify_ref01_data = Helpers.to_map(email_domain_verify_ref01_data_raw[0][1])
    end

  end
end

def email_domain_verify_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "email_domain_verify", "EmailDomainVerifyTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmEmailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["email_domain_verify01", "email_domain_verify02", "email_domain_verify03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID" => idmap,
    "LM_EMAIL_TEST_LIVE" => "FALSE",
    "LM_EMAIL_TEST_EXPLAIN" => "FALSE",
    "LM_EMAIL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LM_EMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["LM_EMAIL_APIKEY"],
      },
      extra || {},
    ])
    client = LmEmailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LM_EMAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LM_EMAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
