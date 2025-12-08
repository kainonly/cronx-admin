package crud

// DeleteDto represents the data transfer object for batch delete operations.
type DeleteDto struct {
	// IDs contains the list of resource identifiers to be deleted.
	IDs []string `json:"ids"`
}
