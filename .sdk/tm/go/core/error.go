package core

type LmEmailError struct {
	IsLmEmailError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLmEmailError(code string, msg string, ctx *Context) *LmEmailError {
	return &LmEmailError{
		IsLmEmailError: true,
		Sdk:              "LmEmail",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LmEmailError) Error() string {
	return e.Msg
}
