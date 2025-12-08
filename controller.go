package crud

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"
)

type Controller interface {
	Create(ctx context.Context, c *app.RequestContext)
	Find(ctx context.Context, c *app.RequestContext)
	FindById(ctx context.Context, c *app.RequestContext)
	Update(ctx context.Context, c *app.RequestContext)
	Delete(ctx context.Context, c *app.RequestContext)
}

func SetPipe(ctx context.Context, i any) context.Context {
	return context.WithValue(ctx, "pipe", i)
}

var OrderBy = map[string]string{
	"1":  "",
	"-1": "desc",
}
