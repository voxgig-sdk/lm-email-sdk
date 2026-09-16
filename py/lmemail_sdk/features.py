# LmEmail SDK feature factory

from lmemail_sdk.feature.base_feature import LmEmailBaseFeature
from lmemail_sdk.feature.debug_feature import LmEmailDebugFeature
from lmemail_sdk.feature.idempotency_feature import LmEmailIdempotencyFeature
from lmemail_sdk.feature.metrics_feature import LmEmailMetricsFeature
from lmemail_sdk.feature.paging_feature import LmEmailPagingFeature
from lmemail_sdk.feature.ratelimit_feature import LmEmailRatelimitFeature
from lmemail_sdk.feature.retry_feature import LmEmailRetryFeature
from lmemail_sdk.feature.test_feature import LmEmailTestFeature
from lmemail_sdk.feature.timeout_feature import LmEmailTimeoutFeature


_FEATURES = {
    "base": lambda: LmEmailBaseFeature(),
    "debug": lambda: LmEmailDebugFeature(),
    "idempotency": lambda: LmEmailIdempotencyFeature(),
    "metrics": lambda: LmEmailMetricsFeature(),
    "paging": lambda: LmEmailPagingFeature(),
    "ratelimit": lambda: LmEmailRatelimitFeature(),
    "retry": lambda: LmEmailRetryFeature(),
    "test": lambda: LmEmailTestFeature(),
    "timeout": lambda: LmEmailTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
