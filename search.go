package crud

import (
	"context"
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"gorm.io/gorm"
)

type SearchDto struct {
	M   string `query:"m,omitempty"`   // 使用查询模式，1：简化字段，用于异步返回
	Q   string `query:"q,omitempty"`   // 关键词查询
	IDs string `query:"ids,omitempty"` // 已存在 IDs
}

func (x *SearchDto) IsCode() bool {
	regex, _ := regexp.Compile(`^\d{3,}$`)
	return regex.MatchString(x.Q)
}

func (x *SearchDto) IsNo() bool {
	regex, _ := regexp.Compile(`^[NBM]-`)
	return regex.MatchString(x.Q)
}

func (x *SearchDto) GetCode() int {
	v, _ := strconv.Atoi(x.Q)
	return v
}

func (x *SearchDto) GetKeyword() string {
	return fmt.Sprintf(`%%%s%%`, x.Q)
}

type SearchPipe struct {
	keys  []string // 指定字段，默认：id,name
	async bool     // 前端异步
}

func (x *SearchPipe) SkipAsync() *SearchPipe {
	x.async = false
	return x
}

func NewSearchPipe(keys ...string) *SearchPipe {
	search := &SearchPipe{
		keys:  []string{},
		async: true,
	}
	for _, key := range keys {
		search.keys = append(search.keys, key)
	}
	if len(keys) == 0 {
		search.keys = []string{"id", "name"}
	}
	return search
}

func (x *SearchDto) Get(ctx context.Context) *SearchPipe {
	return ctx.Value("pipe").(*SearchPipe)
}

func (x *SearchDto) Factory(ctx context.Context, do *gorm.DB) *gorm.DB {
	p := x.Get(ctx)
	if p.async {
		do = do.Limit(50)
	}
	return do.Select(p.keys)
}

func (x *SearchDto) Find(ctx context.Context, do *gorm.DB, i any) (err error) {
	p := x.Get(ctx)
	if x.IDs != "" {
		ids := strings.Split(x.IDs, ",")
		return do.Raw(`(?) union all (?)`,
			do.WithContext(ctx).Select(p.keys).Where(`id in (?)`, ids),
			x.Factory(ctx, do.WithContext(ctx)).Where(`id not in (?)`, ids),
		).Find(i).Error
	} else {
		return x.Factory(ctx, do).Find(i).Error
	}
}

type SearchResult struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
