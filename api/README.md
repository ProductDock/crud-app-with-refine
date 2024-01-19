# API for ticket system

## Routes
Check routes definition

```go
	// Define CRUD HTTP routes for ticket-related operations.
	router.GET("/tickets", handler.ListTickets)
	router.GET("/tickets/:id", handler.GetTicketById)
	router.POST("/tickets", handler.AddTicket)
	router.PATCH("/tickets/:id/status", handler.UpdateTicketStatus)
	router.DELETE("/tickets/:id", handler.DeleteTicketById)
```

## Build and run
Build API: `make build`

Run API: `make run` Check if connected to MongoDB!

## Test with Bruno

Bruno: https://www.usebruno.com/

There is a bruno collection `bruno_client` which you can import and start using/testing.