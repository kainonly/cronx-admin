package crud

import (
	"context"
	"fmt"

	"github.com/kainonly/go/help"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// ExistsDto represents the data transfer object for duplicate checking operations.
type ExistsDto struct {
	// Key specifies the field name to check for duplicates.
	Key string `query:"key,omitempty"`
	// Q is the value to check for existence.
	Q string `query:"q,omitempty"`
}

// ExistsPipe configures which fields are allowed for duplicate checking.
type ExistsPipe struct {
	fields map[string]bool
}

// NewExistsPipe creates a new ExistsPipe with the specified allowed field keys.
func NewExistsPipe(keys ...string) *ExistsPipe {
	fields := make(map[string]bool)
	for _, key := range keys {
		fields[key] = true
	}
	return &ExistsPipe{
		fields: fields,
	}
}

// Get retrieves the ExistsPipe configuration from the context.
func (x *ExistsDto) Get(ctx context.Context) *ExistsPipe {
	return ctx.Value("pipe").(*ExistsPipe)
}

// ExistsResult represents the result of a duplicate check operation.
type ExistsResult struct {
	// Exists indicates whether the value already exists in the database.
	Exists bool `json:"exists"`
}

// Exists checks if a value already exists in the specified field.
// Returns an error if the field is not allowed for duplicate checking.
func (x *ExistsDto) Exists(ctx context.Context, do *gorm.DB) (result ExistsResult, err error) {
	p := x.Get(ctx)
	if !p.fields[x.Key] {
		err = help.E(0, fmt.Sprintf(`field [%s] is not allowed for duplicate checking`, x.Key))
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
