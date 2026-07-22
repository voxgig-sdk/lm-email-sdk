<?php
declare(strict_types=1);

// LmEmail SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LmEmailFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LmEmailBaseFeature();
            case "test":
                return new LmEmailTestFeature();
            default:
                return new LmEmailBaseFeature();
        }
    }
}
