package crud

import (
	"context"
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"gorm.io/gorm"
)

type FindDto struct {
	PageSize int64    `header:"x-pagesize" vd:"omitempty,min=0,max=1000"`
	Page     int64    `header:"x-page" vd:"omitempty,min=0"`
	Q        string   `query:"q,omitempty"`
	Sort     []string `query:"sort,omitempty" vd:"omitempty,dive,sort"`
}

func (x *FindDto) GetPageSize() int {
	if x.PageSize == 0 {
		x.PageSize = 1000
	}
	return int(x.PageSize)
}

func (x *FindDto) GetOffset() int {
	return int(x.Page) * int(x.PageSize)
}

func (x *FindDto) IsCode() bool {
	regex, _ := regexp.Compile(`^\d{3,}$`)
	return regex.MatchString(x.Q)
}

func (x *FindDto) IsNo() bool {
	regex, _ := regexp.Compile(`^[NBM]-`)
	return regex.MatchString(x.Q)
}

func (x *FindDto) GetCode() int {
	v, _ := strconv.Atoi(x.Q)
	return v
}

func (x *FindDto) GetKeyword() string {
	return fmt.Sprintf(`%%%s%%`, x.Q)
}

type FindPipe struct {
	ts   bool
	sort bool
	page bool
	keys []string
	omit []string
}

func (x *FindDto) Get(ctx context.Context) *FindPipe {
	return ctx.Value("pipe").(*FindPipe)
}

func NewFindPipe() *FindPipe {
	return &FindPipe{
		ts:   true,
		sort: true,
		page: true,
	}
}

func (x *FindPipe) SkipTs() *FindPipe {
	x.ts = false
	return x
}

func (x *FindPipe) SkipSort() *FindPipe {
	x.sort = false
	return x
}

func (x *FindPipe) SkipPage() *FindPipe {
	x.page = false
	return x
}

func (x *FindPipe) Select(keys ...string) *FindPipe {
	x.keys = keys
	return x
}

func (x *FindPipe) Omit(keys ...string) *FindPipe {
	x.omit = keys
	return x
}

func (x *FindDto) Factory(ctx context.Context, do *gorm.DB) *gorm.DB {
	p := x.Get(ctx)
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

	if p.sort {
		if len(x.Sort) == 0 && p.ts {
			do = do.Order("create_time desc")
		}
		for _, v := range x.Sort {
			rule := strings.Split(v, ":")
			do = do.Order(fmt.Sprintf(`%s %s`, rule[0], OrderBy[rule[1]]))
		}
	}

	if p.page {
		do = do.Limit(x.GetPageSize()).Offset(x.GetOffset())
	}
	return do
}

func (x *FindDto) Find(ctx context.Context, do *gorm.DB, i interface{}) (err error) {
	if err = x.Factory(ctx, do).Find(i).Error; err != nil {
		return
	}
	return
}
