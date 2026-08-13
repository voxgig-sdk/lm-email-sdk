# LmEmail SDK exists test

import pytest
from lmemail_sdk import LmEmailSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LmEmailSDK.test(None, None)
        assert testsdk is not None
