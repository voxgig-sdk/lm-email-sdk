# EmailDomainDetail entity test

require "minitest/autorun"
require "json"
require_relative "../LmEmail_sdk"
require_relative "runner"

class EmailDomainDetailEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = LmEmailSDK.test(nil, nil)
    ent = testsdk.EmailDomainDetail(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "email_domain_detail" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = LmEmailSDK.test(seed, nil).EmailDomainDetail(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "email_domain_detail" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LmEmailSDK.test(seed, nil)
    seen = base.EmailDomainDetail(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LmEmailConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LmEmailSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.EmailDomainDetail(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < LmEmailBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "email_domain_detail hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      LmEmailSDK.test(offline, nil).EmailDomainDetail(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    LmEmailSDK.test(offline, nil).EmailDomainDetail(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = LmEmailConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = LmEmailSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.EmailDomainDetail(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    LmEmailSDK.test(nil, nil).EmailDomainDetail(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = LmEmailSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.EmailDomainDetail(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.EmailDomainDetail(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = LmEmailConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = LmEmailSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.EmailDomainDetail(nil).list({ "page" => "x", "size" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = email_domain_detail_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "email_domain_detail." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    email_domain_detail_ref01_ent = client.EmailDomainDetail(nil)
    email_domain_detail_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.email_domain_detail"), "email_domain_detail_ref01"))

    email_domain_detail_ref01_data_result = email_domain_detail_ref01_ent.create(email_domain_detail_ref01_data, nil)
    email_domain_detail_ref01_data = Helpers.to_map(email_domain_detail_ref01_data_result.respond_to?(:data_get) ? email_domain_detail_ref01_data_result.data_get : email_domain_detail_ref01_data_result)
    assert !email_domain_detail_ref01_data.nil?
    assert !email_domain_detail_ref01_data["id"].nil?

    # LIST
    email_domain_detail_ref01_match = {}

    email_domain_detail_ref01_list_result = email_domain_detail_ref01_ent.list(email_domain_detail_ref01_match, nil)
    assert email_domain_detail_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(email_domain_detail_ref01_list_result),
      { "id" => email_domain_detail_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    email_domain_detail_ref01_match_dt0 = {
      "id" => email_domain_detail_ref01_data["id"],
    }
    email_domain_detail_ref01_data_dt0_loaded = email_domain_detail_ref01_ent.load(email_domain_detail_ref01_match_dt0, nil)
    email_domain_detail_ref01_data_dt0_load_result = Helpers.to_map(email_domain_detail_ref01_data_dt0_loaded.respond_to?(:data_get) ? email_domain_detail_ref01_data_dt0_loaded.data_get : email_domain_detail_ref01_data_dt0_loaded)
    assert !email_domain_detail_ref01_data_dt0_load_result.nil?
    assert_equal email_domain_detail_ref01_data_dt0_load_result["id"], email_domain_detail_ref01_data["id"]

  end
end

def email_domain_detail_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "email_domain_detail", "EmailDomainDetailTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LmEmailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["email_domain_detail01", "email_domain_detail02", "email_domain_detail03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID" => idmap,
    "LM_EMAIL_TEST_LIVE" => "FALSE",
    "LM_EMAIL_TEST_EXPLAIN" => "FALSE",
    "LM_EMAIL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID"])
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
