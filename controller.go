// Package crud provides generic CRUD (Create, Read, Update, Delete) operations
// for building RESTful APIs with Hertz framework and GORM ORM.
package crud

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"
)

// Controller defines the standard interface for CRUD operations.
// Implementations should handle HTTP requests for resource management.
type Controller interface {
	// Create handles the creation of a new resource.
	Create(ctx context.Context, c *app.RequestContext)
	// Find handles querying multiple resources with pagination and filtering.
	Find(ctx context.Context, c *app.RequestContext)
	// FindById handles retrieving a single resource by its ID.
	FindById(ctx context.Context, c *app.RequestContext)
	// Update handles modifying an existing resource.
	Update(ctx context.Context, c *app.RequestContext)
	// Delete handles removing one or more resources.
	Delete(ctx context.Context, c *app.RequestContext)
}

// SetPipe stores a pipe configuration in the context.
// The pipe is used to customize query behavior for different operations.
func SetPipe(ctx context.Context, i any) context.Context {
	return context.WithValue(ctx, "pipe", i)
}

// OrderBy maps sort direction indicators to SQL order keywords.
// "1" represents ascending order (default), "-1" represents descending order.
var OrderBy = map[string]string{
	"1":  "",
	"-1": "desc",
}
