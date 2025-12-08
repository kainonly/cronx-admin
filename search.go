package crud

import (
	"context"
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"gorm.io/gorm"
)

// SearchDto represents the data transfer object for search operations.
type SearchDto struct {
	// M specifies the query mode (1: simplified fields for async returns).
	M string `query:"m,omitempty"`
	// Q is the search keyword.
	Q string `query:"q,omitempty"`
	// IDs contains existing IDs to prioritize in search results.
	IDs string `query:"ids,omitempty"`
}

// IsCode checks if the query string matches a numeric code pattern (3+ digits).
func (x *SearchDto) IsCode() bool {
	regex, _ := regexp.Compile(`^\d{3,}$`)
	return regex.MatchString(x.Q)
}

// IsNo checks if the query string matches a number pattern (N-, B-, or M- prefix).
func (x *SearchDto) IsNo() bool {
	regex, _ := regexp.Compile(`^[NBM]-`)
	return regex.MatchString(x.Q)
}

// GetCode converts the query string to an integer code.
func (x *SearchDto) GetCode() int {
	v, _ := strconv.Atoi(x.Q)
	return v
}

// GetKeyword returns the query string wrapped with SQL LIKE wildcards.
func (x *SearchDto) GetKeyword() string {
	return fmt.Sprintf(`%%%s%%`, x.Q)
}

// SearchPipe configures the behavior of search operations.
type SearchPipe struct {
	keys  []string // Fields to select (default: id, name)
	async bool     // Enable async mode for frontend
}

// SkipAsync disables the async mode limit.
func (x *SearchPipe) SkipAsync() *SearchPipe {
	x.async = false
	return x
}

// NewSearchPipe creates a new SearchPipe with the specified field keys.
// If no keys are provided, defaults to ["id", "name"].
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

// Get retrieves the SearchPipe configuration from the context.
func (x *SearchDto) Get(ctx context.Context) *SearchPipe {
	return ctx.Value("pipe").(*SearchPipe)
}

// Factory applies the pipe configuration to the database query.
// It handles field selection and async mode limits.
func (x *SearchDto) Factory(ctx context.Context, do *gorm.DB) *gorm.DB {
	p := x.Get(ctx)
	if p.async {
		do = do.Limit(50)
	}
	return do.Select(p.keys)
}

// Find executes the search query and stores the results in the provided interface.
// If IDs are provided, they are prioritized at the top of results.
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

// SearchResult represents a standard search result item.
type SearchResult struct {
	// ID is the unique identifier of the resource.
	ID string `json:"id"`
	// Name is the display name of the resource.
	Name string `json:"name"`
}
