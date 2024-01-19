package main

import "time"

// Ticket represents the structure of a Help Desk Ticket
type Ticket struct {
	ID          string        `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	Priority    string        `json:"priority"`
	Category    string        `json:"category"`
	DueDate     string        `json:"dueDate"`
	History     []TicketEvent `json:"history"`
}

// TicketEvent represents an event in the history log of a Help Desk Ticket
type TicketEvent struct {
	Timestamp time.Time `json:"timestamp"`
	Event     string    `json:"event"`
}
