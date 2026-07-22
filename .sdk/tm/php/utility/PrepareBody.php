<?php
declare(strict_types=1);

// LmEmail SDK utility: prepare_body

class LmEmailPrepareBody
{
    public static function call(LmEmailContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
