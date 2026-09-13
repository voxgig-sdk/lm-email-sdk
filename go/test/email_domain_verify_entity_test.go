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

func TestEmailDomainVerifyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.EmailDomainVerify(nil)
		if ent == nil {
			t.Fatal("expected non-nil EmailDomainVerifyEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := email_domain_verifyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "email_domain_verify." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		emailDomainVerifyRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.email_domain_verify")))
		var emailDomainVerifyRef01Data map[string]any
		if len(emailDomainVerifyRef01DataRaw) > 0 {
			emailDomainVerifyRef01Data = core.ToMapAny(emailDomainVerifyRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = emailDomainVerifyRef01Data

		// LOAD
		emailDomainVerifyRef01Ent := client.EmailDomainVerify(nil)
		emailDomainVerifyRef01MatchDt0 := map[string]any{}
		emailDomainVerifyRef01DataDt0Loaded, err := emailDomainVerifyRef01Ent.Load(emailDomainVerifyRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if emailDomainVerifyRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func email_domain_verifyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "email_domain_verify", "EmailDomainVerifyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read email_domain_verify test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse email_domain_verify test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"email_domain_verify01", "email_domain_verify02", "email_domain_verify03", "domain01", "domain02", "domain03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID": idmap,
		"LM_EMAIL_TEST_LIVE":      "FALSE",
		"LM_EMAIL_TEST_EXPLAIN":   "FALSE",
		"LM_EMAIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_EMAIL_TEST_EMAIL_DOMAIN_VERIFY_ENTID"])
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
