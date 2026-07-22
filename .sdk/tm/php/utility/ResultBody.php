<?php
declare(strict_types=1);

// LmEmail SDK utility: result_body

class LmEmailResultBody
{
    public static function call(LmEmailContext $ctx): ?LmEmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
