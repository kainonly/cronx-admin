package crud

import (
	"context"
	"fmt"

	"github.com/kainonly/go/help"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ExistsDto struct {
	Key string `query:"key,omitempty"`
	Q   string `query:"q,omitempty"`
}

type ExistsPipe struct {
	fields map[string]bool
}

func NewExistsPipe(keys ...string) *ExistsPipe {
	fields := make(map[string]bool)
	for _, key := range keys {
		fields[key] = true
	}
	return &ExistsPipe{
		fields: fields,
	}
}

func (x *ExistsDto) Get(ctx context.Context) *ExistsPipe {
	return ctx.Value("pipe").(*ExistsPipe)
}

type ExistsResult struct {
	Exists bool `json:"exists"`
}

func (x *ExistsDto) Exists(ctx context.Context, do *gorm.DB) (result ExistsResult, err error) {
	p := x.Get(ctx)
	if !p.fields[x.Key] {
		err = help.E(0, fmt.Sprintf(`[%s] 字段不允许查重`, x.Key))
		return
	}
	var count int64
	if err = do.
		Where(`? = ?`, clause.Column{Name: x.Key}, x.Q).
		Count(&count).Error; err != nil {
		return
	}
	result = ExistsResult{
		Exists: count != 0,
	}
	return
}
