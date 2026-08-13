# LmEmail SDK feature factory

from lmemail_sdk.feature.base_feature import LmEmailBaseFeature
from lmemail_sdk.feature.test_feature import LmEmailTestFeature


def _make_feature(name):
    features = {
        "base": lambda: LmEmailBaseFeature(),
        "test": lambda: LmEmailTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
