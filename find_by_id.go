package crud

import (
	"context"

	"gorm.io/gorm"
)

type FindByIdDto struct {
	ID   string `path:"id"`
	Full int    `query:"full,omitempty"` // 全字段处理（即关联返回）
}

func (x *FindByIdDto) IsFull() bool {
	return x.Full == 1
}

type FindByIdPipe struct {
	ts    bool     // 存在默认时间，例如排除：create_time,update_time，使用 create_time 倒序
	keys  []string // 指定返回字段，不为空时 omit 失效
	omit  []string // 排除返回字段
	fKeys []string // 指定完整模式返回字段，不为空时 fOmit 失效
	fOmit []string // 指定完整模式排除字段
}

func (x *FindByIdDto) Get(ctx context.Context) *FindByIdPipe {
	return ctx.Value("pipe").(*FindByIdPipe)
}

func NewFindByIdPipe() *FindByIdPipe {
	return &FindByIdPipe{
		ts: true,
	}
}

func (x *FindByIdPipe) SkipTs() *FindByIdPipe {
	x.ts = false
	return x
}

func (x *FindByIdPipe) Select(keys ...string) *FindByIdPipe {
	x.keys = keys
	return x
}

func (x *FindByIdPipe) Omit(keys ...string) *FindByIdPipe {
	x.omit = keys
	return x
}

func (x *FindByIdPipe) FullSelect(keys ...string) *FindByIdPipe {
	x.fKeys = keys
	return x
}

func (x *FindByIdPipe) FullOmit(keys ...string) *FindByIdPipe {
	x.fOmit = keys
	return x
}

func (x *FindByIdDto) Take(ctx context.Context, do *gorm.DB, i interface{}) (err error) {
	p := x.Get(ctx)
	if !x.IsFull() {
		if len(p.keys) != 0 {
			do = do.Select(p.keys)
		} else {
			if len(p.omit) == 0 && p.ts {
				do = do.Omit(`create_time`, `update_time`)
			}
			if len(p.omit) != 0 {
				do = do.Omit(p.omit...)
			}
		}
	} else {
		if len(p.fKeys) != 0 {
			do = do.Select(p.fKeys)
		} else {
			if len(p.fOmit) != 0 {
				do = do.Omit(p.fOmit...)
			}
		}
	}

	return do.Where(`id = ?`, x.ID).Take(i).Error
}
