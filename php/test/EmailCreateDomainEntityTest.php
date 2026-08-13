<?php
declare(strict_types=1);

// EmailCreateDomain entity test

require_once __DIR__ . '/../lmemail_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class EmailCreateDomainEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LmEmailSDK::test(null, null);
        $ent = $testsdk->EmailCreateDomain(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = email_create_domain_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "email_create_domain." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $email_create_domain_ref01_ent = $client->EmailCreateDomain(null);
        $email_create_domain_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.email_create_domain"), "email_create_domain_ref01"));

        $email_create_domain_ref01_data_result = $email_create_domain_ref01_ent->create($email_create_domain_ref01_data, null);
        $email_create_domain_ref01_data = Helpers::to_map(is_object($email_create_domain_ref01_data_result) && method_exists($email_create_domain_ref01_data_result, 'data_get') ? $email_create_domain_ref01_data_result->data_get() : $email_create_domain_ref01_data_result);
        $this->assertNotNull($email_create_domain_ref01_data);

    }
}

function email_create_domain_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/email_create_domain/EmailCreateDomainTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LmEmailSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["email_create_domain01", "email_create_domain02", "email_create_domain03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID" => $idmap,
        "LM_EMAIL_TEST_LIVE" => "FALSE",
        "LM_EMAIL_TEST_EXPLAIN" => "FALSE",
        "LM_EMAIL_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LM_EMAIL_TEST_EMAIL_CREATE_DOMAIN_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LM_EMAIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["LM_EMAIL_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new LmEmailSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LM_EMAIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LM_EMAIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
