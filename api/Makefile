GOCMD=go
GOBUILD=$(GOCMD) build
GOFMT=gofmt -s -w

# Application name
APPNAME=ticket-management

# Directories
SRC=./

all: fmt build

build:
	@echo "Building $(APPNAME)"
	@$(GOBUILD) -o $(APPNAME) $(SRC)
fmt:
	@echo "Formatting code"
	@$(GOFMT) $(SRC)
run:
	@echo "Running $(APPNAME)"
	GIN_MODE=release ./$(APPNAME)

.PHONY: all build fmt run