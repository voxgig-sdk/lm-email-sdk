<?php
declare(strict_types=1);

// LmEmail SDK base feature

class LmEmailBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LmEmailContext $ctx, array $options): void {}
    public function PostConstruct(LmEmailContext $ctx): void {}
    public function PostConstructEntity(LmEmailContext $ctx): void {}
    public function SetData(LmEmailContext $ctx): void {}
    public function GetData(LmEmailContext $ctx): void {}
    public function GetMatch(LmEmailContext $ctx): void {}
    public function SetMatch(LmEmailContext $ctx): void {}
    public function PrePoint(LmEmailContext $ctx): void {}
    public function PreSpec(LmEmailContext $ctx): void {}
    public function PreRequest(LmEmailContext $ctx): void {}
    public function PreResponse(LmEmailContext $ctx): void {}
    public function PreResult(LmEmailContext $ctx): void {}
    public function PreDone(LmEmailContext $ctx): void {}
    public function PreUnexpected(LmEmailContext $ctx): void {}
}
