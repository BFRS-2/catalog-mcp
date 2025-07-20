#!/bin/bash

PROJECT_DIR="/home/ubuntu/catalog-mcp"

if [ ! -d "$PROJECT_DIR" ]; then
    git clone git@github.com:bfrs/catalog-mcp.git
fi

cd "$PROJECT_DIR"
git reset --hard && git clean -fd && git checkout main
git pull

docker compose up -d --build

docker system prune -f