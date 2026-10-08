# SendMessage entity test

import json
import os
import time

import pytest

from lmemail_sdk.utility.voxgig_struct import voxgig_struct as vs
from lmemail_sdk import LmEmailSDK
from lmemail_sdk.core import helpers
from lmemail_sdk.config import shared_config
from lmemail_sdk.feature.base_feature import LmEmailBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestSendMessageEntity:

    def test_should_create_instance(self):
        testsdk = LmEmailSDK.test(None, None)
        ent = testsdk.SendMessage(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = LmEmailSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.SendMessage(None).create({"requestId": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _send_message_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "send_message." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        client = setup["client"]

        # CREATE
        send_message_ref01_ent = client.SendMessage(None)
        send_message_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.send_message"), "send_message_ref01"))

        send_message_ref01_data = helpers.to_map(runner.entity_data(send_message_ref01_ent.create(send_message_ref01_data, None)))
        assert send_message_ref01_data is not None



def _send_message_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/send_message/SendMessageTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LmEmailSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["send_message01", "send_message02", "send_message03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "LM_EMAIL_TEST_SEND_MESSAGE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LM_EMAIL_TEST_SEND_MESSAGE_ENTID": idmap,
        "LM_EMAIL_TEST_LIVE": "FALSE",
        "LM_EMAIL_TEST_EXPLAIN": "FALSE",
        "LM_EMAIL_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("LM_EMAIL_TEST_SEND_MESSAGE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LM_EMAIL_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("LM_EMAIL_APIKEY"),
            },
            extra or {},
        ])
        client = LmEmailSDK(helpers.to_map(merged_opts))

    _live = env.get("LM_EMAIL_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LM_EMAIL_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
