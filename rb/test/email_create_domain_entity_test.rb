# EmailCreateDomain entity test

require "minitest/autorun"
require "json"
require_relative "../LmEmail_sdk"
require_relative "runner"

class EmailCreateDomainEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LmEmailSDK.test(nil, nil)
    ent = testsdk.EmailCreateDomain(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = email_create_domain_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "email_create_domain." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LMEMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    email_create_domain_ref01_ent = client.EmailCreateDomain(nil)
    email_create_domain_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.email_create_domain"), "email_create_domain_ref01"))

    email_create_domain_ref01_data_result = email_create_domain_ref01_ent.create(email_create_domain_ref01_data, nil)
    email_create_domain_ref01_data = Helpers.to_map(email_create_domain_ref01_data_result)
    assert !email_create_domain_ref01_data.nil?

  end
end

def email_create_domain_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "email_create_domain", "EmailCreateDomainTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmEmailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["email_create_domain01", "email_create_domain02", "email_create_domain03"],
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
  entid_env_raw = ENV["LMEMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LMEMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID" => idmap,
    "LMEMAIL_TEST_LIVE" => "FALSE",
    "LMEMAIL_TEST_EXPLAIN" => "FALSE",
    "LMEMAIL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["LMEMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LMEMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["LMEMAIL_APIKEY"],
      },
      extra || {},
    ])
    client = LmEmailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LMEMAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LMEMAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
