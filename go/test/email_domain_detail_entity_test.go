package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/lm-email-sdk/go"
	"github.com/voxgig-sdk/lm-email-sdk/go/core"

	vs "github.com/voxgig-sdk/lm-email-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const email_domain_detailEntityLiveStrict = true


func TestEmailDomainDetailEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EmailDomainDetail(nil)
		if ent == nil {
			t.Fatal("expected non-nil EmailDomainDetailEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.EmailDomainDetail(nil).Load(map[string]any{"id": "x"}, nil)
		if sdkerr, ok := err.(*core.LmEmailError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := email_domain_detailBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "email_domain_detail." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client

		// CREATE
		emailDomainDetailRef01Ent := client.EmailDomainDetail(nil)
		emailDomainDetailRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "email_domain_detail"}), "email_domain_detail_ref01"))

		emailDomainDetailRef01DataResult, err := emailDomainDetailRef01Ent.Create(emailDomainDetailRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		emailDomainDetailRef01Data = core.ToMapAny(entityData(emailDomainDetailRef01DataResult))
		if emailDomainDetailRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if emailDomainDetailRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		emailDomainDetailRef01MatchDt0 := map[string]any{
			"id": emailDomainDetailRef01Data["id"],
		}
		emailDomainDetailRef01DataDt0Loaded, err := emailDomainDetailRef01Ent.Load(emailDomainDetailRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		emailDomainDetailRef01DataDt0LoadResult := core.ToMapAny(entityData(emailDomainDetailRef01DataDt0Loaded))
		if emailDomainDetailRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if emailDomainDetailRef01DataDt0LoadResult["id"] != emailDomainDetailRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func email_domain_detailBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "email_domain_detail", "EmailDomainDetailTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read email_domain_detail test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse email_domain_detail test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"email_domain_detail01", "email_domain_detail02", "email_domain_detail03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID": idmap,
		"LM_EMAIL_TEST_LIVE":      "FALSE",
		"LM_EMAIL_TEST_EXPLAIN":   "FALSE",
		"LM_EMAIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_EMAIL_TEST_EMAIL_DOMAIN_DETAIL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LM_EMAIL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["LM_EMAIL_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewLmEmailSDK(core.ToMapAny(mergedOpts))
	}

	live := env["LM_EMAIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LM_EMAIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
