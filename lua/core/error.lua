-- LmEmail SDK error

local LmEmailError = {}
LmEmailError.__index = LmEmailError


function LmEmailError.new(code, msg, ctx)
  local self = setmetatable({}, LmEmailError)
  self.is_sdk_error = true
  self.sdk = "LmEmail"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LmEmailError:error()
  return self.msg
end


function LmEmailError:__tostring()
  return self.msg
end


return LmEmailError
