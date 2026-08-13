# LmEmail SDK utility: make_context

from projectname_sdk.core.context import LmEmailContext


def make_context_util(ctxmap, basectx):
    return LmEmailContext(ctxmap, basectx)
