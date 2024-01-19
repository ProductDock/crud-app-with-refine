package main

import (
	"context"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"time"
)

func main() {

	// Create a new MongoDBStore.
	db, err := NewMongoDBStore("mongodb://localhost:27017")
	if err != nil {
		log.Fatalln(err)
	}
	defer func() {
		if err = db.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// Create a new TicketHandler instance with the MongoDBStore.
	handler := NewTicketHandler(db)

	// Create a new Gin router with default middleware.
	router := gin.Default()
	// Enable CORS
	router.Use(enableCors())

	// Define CRUD HTTP routes for ticket-related operations.
	router.GET("/tickets", handler.ListTickets)
	router.GET("/tickets/:id", handler.GetTicketById)
	router.POST("/tickets", handler.AddTicket)
	router.PATCH("/tickets/:id/status", handler.UpdateTicketStatus)
	router.DELETE("/tickets/:id", handler.DeleteTicketById)

	router.Run("localhost:8080")

}

// enableCors is a middleware function that sets up CORS configuration for the Gin router.
func enableCors() gin.HandlerFunc {
	return cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	})
}
