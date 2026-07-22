<?php
declare(strict_types=1);

// LmEmail SDK utility: result_headers

class LmEmailResultHeaders
{
    public static function call(LmEmailContext $ctx): ?LmEmailResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
