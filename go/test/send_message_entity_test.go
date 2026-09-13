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

func TestSendMessageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.SendMessage(nil)
		if ent == nil {
			t.Fatal("expected non-nil SendMessageEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := send_messageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "send_message." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LM_EMAIL_TEST_SEND_MESSAGE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		sendMessageRef01Ent := client.SendMessage(nil)
		sendMessageRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "send_message"}), "send_message_ref01"))

		sendMessageRef01DataResult, err := sendMessageRef01Ent.Create(sendMessageRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		sendMessageRef01Data = core.ToMapAny(entityData(sendMessageRef01DataResult))
		if sendMessageRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func send_messageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "send_message", "SendMessageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read send_message test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse send_message test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"send_message01", "send_message02", "send_message03"},
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
	entidEnvRaw := os.Getenv("LM_EMAIL_TEST_SEND_MESSAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LM_EMAIL_TEST_SEND_MESSAGE_ENTID": idmap,
		"LM_EMAIL_TEST_LIVE":      "FALSE",
		"LM_EMAIL_TEST_EXPLAIN":   "FALSE",
		"LM_EMAIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["LM_EMAIL_TEST_SEND_MESSAGE_ENTID"])
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
