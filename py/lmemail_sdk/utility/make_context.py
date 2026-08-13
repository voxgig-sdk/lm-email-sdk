# LmEmail SDK utility: make_context

from lmemail_sdk.core.context import LmEmailContext


def make_context_util(ctxmap, basectx):
    return LmEmailContext(ctxmap, basectx)
