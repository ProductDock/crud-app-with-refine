package main

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"log"
	"net/http"
)

// Response is a struct to represent the JSON response structure.
type Response struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

// TicketHandler is a struct that handles HTTP requests related to ticket management.
type TicketHandler struct {
	store ticketStore
}

// NewTicketHandler creates and returns a new TicketHandler instance with the provided ticketStore.
func NewTicketHandler(ts ticketStore) *TicketHandler {
	return &TicketHandler{
		store: ts,
	}
}

// ListTickets handles the request to retrieve a list of all tickets.
func (th TicketHandler) ListTickets(c *gin.Context) {
	all, err := th.store.List()

	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, []string{})
	}
	c.IndentedJSON(http.StatusOK, all)
}

// GetTicketById handles the request to retrieve a specific ticket by its ID.
func (th TicketHandler) GetTicketById(c *gin.Context) {
	id := c.Param("id")

	ticket, err := th.store.Get(id)

	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, []string{})
	}
	c.IndentedJSON(http.StatusOK, ticket)
}

// AddTicket handles the request to add a new ticket to the store.
func (th TicketHandler) AddTicket(c *gin.Context) {
	var t Ticket
	if err := c.BindJSON(&t); err != nil {
		log.Println(err)
		return
	}
	id, _ := uuid.NewUUID()
	t.ID = id.String()
	err := th.store.Add(t)

	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, t)
	}

	c.IndentedJSON(http.StatusOK, t)
}

func (th TicketHandler) UpdateTicketStatus(c *gin.Context) {
	id := c.Param("id")

	// Extract the new event from the request body as a string.
	payload := struct {
		Event string
	}{}

	if err := c.BindJSON(&payload); err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, Response{
			Status:  http.StatusBadRequest,
			Message: "Invalid request body",
		})
		return
	}

	// Update the ticket status with the new event.
	if err := th.store.UpdateHistory(id, payload.Event); err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest,
			Response{
				Status:  http.StatusBadRequest,
				Message: "Failed to update ticket status",
			})
		return
	}

	c.IndentedJSON(http.StatusOK, Response{
		Status:  http.StatusOK,
		Message: "Ticket status updated successfully",
	})
}

func (th TicketHandler) DeleteTicketById(c *gin.Context) {
	id := c.Param("id")

	err := th.store.Delete(id)

	if err != nil {
		log.Println(err)
		c.IndentedJSON(http.StatusBadRequest, []string{})
	}
	c.IndentedJSON(http.StatusOK, Response{
		Status:  http.StatusOK,
		Message: "Ticket deleted",
	})
}
