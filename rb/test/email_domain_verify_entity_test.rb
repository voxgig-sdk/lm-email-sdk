# EmailDomainVerify entity test

require "minitest/autorun"
require "json"
require_relative "../LmEmail_sdk"
require_relative "runner"

class EmailDomainVerifyEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmEmailSDK.test(nil, nil)
    ent = testsdk.EmailDomainVerify(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = email_domain_verify_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "email_domain_verify." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    email_domain_verify_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.email_domain_verify")))
    email_domain_verify_ref01_data = nil
    if email_domain_verify_ref01_data_raw.length > 0
      email_domain_verify_ref01_data = Helpers.to_map(email_domain_verify_ref01_data_raw[0][1])
    end

    # LOAD
    email_domain_verify_ref01_ent = client.EmailDomainVerify(nil)
    email_domain_verify_ref01_match_dt0 = {}
    email_domain_verify_ref01_data_dt0_loaded = email_domain_verify_ref01_ent.load(email_domain_verify_ref01_match_dt0, nil)
    assert !email_domain_verify_ref01_data_dt0_loaded.nil?

  end
end

def email_domain_verify_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "email_domain_verify", "EmailDomainVerifyTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmEmailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["email_domain_verify01", "email_domain_verify02", "email_domain_verify03", "domain01", "domain02", "domain03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID" => idmap,
    "LM_EMAIL_TEST_LIVE" => "FALSE",
    "LM_EMAIL_TEST_EXPLAIN" => "FALSE",
    "LM_EMAIL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LM_EMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
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
