<?php
declare(strict_types=1);

// LmEmail SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LmEmailMakeContext
{
    public static function call(array $ctxmap, ?LmEmailContext $basectx): LmEmailContext
    {
        return new LmEmailContext($ctxmap, $basectx);
    }
}
