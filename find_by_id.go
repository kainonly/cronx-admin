package crud

import (
	"context"

	"gorm.io/gorm"
)

// FindByIdDto represents the data transfer object for single resource retrieval by ID.
type FindByIdDto struct {
	// ID is the unique identifier of the resource to retrieve.
	ID string `path:"id"`
	// Full enables full field mode when set to 1 (includes related data).
	Full int `query:"full,omitempty"`
}

// IsFull returns true if full field mode is enabled.
func (x *FindByIdDto) IsFull() bool {
	return x.Full == 1
}

// FindByIdPipe configures the behavior of find-by-id operations.
type FindByIdPipe struct {
	ts    bool     // Include timestamp fields (create_time, update_time)
	keys  []string // Fields to select (if set, omit is ignored)
	omit  []string // Fields to omit from results
	fKeys []string // Fields to select in full mode (if set, fOmit is ignored)
	fOmit []string // Fields to omit in full mode
}

// Get retrieves the FindByIdPipe configuration from the context.
func (x *FindByIdDto) Get(ctx context.Context) *FindByIdPipe {
	return ctx.Value("pipe").(*FindByIdPipe)
}

// NewFindByIdPipe creates a new FindByIdPipe with default settings.
// By default, timestamp handling is enabled.
func NewFindByIdPipe() *FindByIdPipe {
	return &FindByIdPipe{
		ts: true,
	}
}

// SkipTs disables the default timestamp field handling.
func (x *FindByIdPipe) SkipTs() *FindByIdPipe {
	x.ts = false
	return x
}

// Select specifies the fields to include in normal mode.
// When set, omit is ignored.
func (x *FindByIdPipe) Select(keys ...string) *FindByIdPipe {
	x.keys = keys
	return x
}

// Omit specifies the fields to exclude in normal mode.
func (x *FindByIdPipe) Omit(keys ...string) *FindByIdPipe {
	x.omit = keys
	return x
}

// FullSelect specifies the fields to include in full mode.
// When set, fOmit is ignored.
func (x *FindByIdPipe) FullSelect(keys ...string) *FindByIdPipe {
	x.fKeys = keys
	return x
}

// FullOmit specifies the fields to exclude in full mode.
func (x *FindByIdPipe) FullOmit(keys ...string) *FindByIdPipe {
	x.fOmit = keys
	return x
}

// Take retrieves a single record by ID and stores it in the provided interface.
// It applies different field selection rules based on whether full mode is enabled.
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
