# LmEmail SDK utility: make_context
require_relative '../core/context'
module LmEmailUtilities
  MakeContext = ->(ctxmap, basectx) {
    LmEmailContext.new(ctxmap, basectx)
  }
end
