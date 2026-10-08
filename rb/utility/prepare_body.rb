# LmEmail SDK utility: prepare_body
require_relative 'media'
module LmEmailUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return LmEmailUtilities.raw_body(ctx.reqdata) if LmEmailUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
