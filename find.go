package crud

import (
	"context"
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"gorm.io/gorm"
)

// FindDto represents the data transfer object for paginated query operations.
type FindDto struct {
	// PageSize specifies the number of records per page (max 1000).
	PageSize int64 `header:"x-pagesize" vd:"omitempty,min=0,max=1000"`
	// Page specifies the current page number (0-based).
	Page int64 `header:"x-page" vd:"omitempty,min=0"`
	// Q is the search keyword for filtering results.
	Q string `query:"q,omitempty"`
	// Sort specifies the sorting rules in format "field:direction".
	Sort []string `query:"sort,omitempty" vd:"omitempty,dive,sort"`
}

// GetPageSize returns the page size, defaulting to 1000 if not specified.
func (x *FindDto) GetPageSize() int {
	if x.PageSize == 0 {
		x.PageSize = 1000
	}
	return int(x.PageSize)
}

// GetOffset calculates the offset for database queries based on page and page size.
func (x *FindDto) GetOffset() int {
	return int(x.Page) * int(x.PageSize)
}

// IsCode checks if the query string matches a numeric code pattern (3+ digits).
func (x *FindDto) IsCode() bool {
	regex, _ := regexp.Compile(`^\d{3,}$`)
	return regex.MatchString(x.Q)
}

// IsNo checks if the query string matches a number pattern (N-, B-, or M- prefix).
func (x *FindDto) IsNo() bool {
	regex, _ := regexp.Compile(`^[NBM]-`)
	return regex.MatchString(x.Q)
}

// GetCode converts the query string to an integer code.
func (x *FindDto) GetCode() int {
	v, _ := strconv.Atoi(x.Q)
	return v
}

// GetKeyword returns the query string wrapped with SQL LIKE wildcards.
func (x *FindDto) GetKeyword() string {
	return fmt.Sprintf(`%%%s%%`, x.Q)
}

// FindPipe configures the behavior of find operations.
type FindPipe struct {
	ts   bool     // Include timestamp fields (create_time, update_time)
	sort bool     // Enable sorting
	page bool     // Enable pagination
	keys []string // Fields to select (if set, omit is ignored)
	omit []string // Fields to omit from results
}

// Get retrieves the FindPipe configuration from the context.
func (x *FindDto) Get(ctx context.Context) *FindPipe {
	return ctx.Value("pipe").(*FindPipe)
}

// NewFindPipe creates a new FindPipe with default settings.
// By default, timestamps, sorting, and pagination are enabled.
func NewFindPipe() *FindPipe {
	return &FindPipe{
		ts:   true,
		sort: true,
		page: true,
	}
}

// SkipTs disables the default timestamp field handling.
func (x *FindPipe) SkipTs() *FindPipe {
	x.ts = false
	return x
}

// SkipSort disables sorting for the query.
func (x *FindPipe) SkipSort() *FindPipe {
	x.sort = false
	return x
}

// SkipPage disables pagination for the query.
func (x *FindPipe) SkipPage() *FindPipe {
	x.page = false
	return x
}

// Select specifies the fields to include in the query results.
// When set, omit is ignored.
func (x *FindPipe) Select(keys ...string) *FindPipe {
	x.keys = keys
	return x
}

// Omit specifies the fields to exclude from the query results.
func (x *FindPipe) Omit(keys ...string) *FindPipe {
	x.omit = keys
	return x
}

// Factory applies the pipe configuration to the database query.
// It handles field selection, omission, sorting, and pagination.
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

// Find executes the query and stores the results in the provided interface.
func (x *FindDto) Find(ctx context.Context, do *gorm.DB, i interface{}) (err error) {
	if err = x.Factory(ctx, do).Find(i).Error; err != nil {
		return
	}
	return
}
