package main

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

const (
	database   = "main"
	collection = "tickets"
)

// MongoDBStore is a concrete implementation of the ticketStore interface using MongoDB as the underlying database.
type MongoDBStore struct {
	*mongo.Client
}

// NewMongoDBStore creates and returns a new MongoDBStore instance connected to the MongoDB server
// specified by the given URI.
func NewMongoDBStore(dbUri string) (*MongoDBStore, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(dbUri))

	if err != nil {
		return nil, err
	}

	// Send a ping to confirm a successful connection
	var result bson.M
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Decode(&result); err != nil {
		panic(err)
	}
	log.Println("Successfully connected to MongoDB!")

	return &MongoDBStore{
		client,
	}, nil
}

// Add inserts a new ticket into the MongoDB collection.
func (tdb MongoDBStore) Add(t Ticket) error {
	c := tdb.Database(database).Collection(collection)
	_, err := c.InsertOne(context.TODO(), &t)
	if err != nil {
		return err
	}
	return nil
}

// List retrieves a list of all tickets from the MongoDB collection.
func (tdb MongoDBStore) List() ([]Ticket, error) {
	c := tdb.Database(database).Collection(collection)
	find, err := c.Find(context.TODO(), bson.D{})
	if err != nil {
		return []Ticket{}, err
	}

	var res []Ticket
	err = find.All(context.TODO(), &res)
	if err != nil {
		return []Ticket{}, err
	}

	return res, nil
}

// Get retrieves a specific ticket from the MongoDB collection by ID.
func (tdb MongoDBStore) Get(id string) (Ticket, error) {
	c := tdb.Database(database).Collection(collection)

	var result Ticket
	err := c.FindOne(context.TODO(), bson.D{{"id", id}}).Decode(&result)
	if err != nil {
		return Ticket{}, err
	}
	return result, nil
}

// Delete deletes a specific ticket from the MongoDB collection by ID.
func (tdb MongoDBStore) Delete(id string) error {
	c := tdb.Database(database).Collection(collection)

	_, err := c.DeleteOne(context.TODO(), bson.D{{"id", id}})
	if err != nil {
		return err
	}
	return nil
}

func (tdb MongoDBStore) UpdateHistory(id string, event string) error {
	c := tdb.Database(database).Collection(collection)
	// Retrieve the existing events for the ticket.
	var existingTicket Ticket
	err := c.FindOne(context.TODO(), bson.D{{"id", id}}).Decode(&existingTicket)
	if err != nil {
		return err
	}

	events := existingTicket.History

	// Append the new event to the existing events.
	events = append(events, TicketEvent{
		Timestamp: time.Now(),
		Event:     event,
	})

	// Update the status of the ticket with the new events.
	_, err = c.UpdateOne(
		context.TODO(),
		bson.D{{"id", id}},
		bson.D{{"$set", bson.D{{"history", events}}}},
	)
	if err != nil {
		return err
	}

	return nil
}
