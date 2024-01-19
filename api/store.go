package main

// ticketStore is an interface that defines methods for interacting with a Ticket store.
type ticketStore interface {
	Add(ticket Ticket) error
	Get(id string) (Ticket, error)
	List() ([]Ticket, error)

	Delete(id string) error

	UpdateHistory(id string, event string) error
}
