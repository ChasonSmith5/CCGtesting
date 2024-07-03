#!/bin/bash

# Install zip utility if not already installed
apt-get update
apt-get install -y zip

# Define directories and files
APP_DIR="/root"
FRONTEND_DIR="/var/www/new"
BACKEND_ZIP="$APP_DIR/files.zip"
FRONTEND_ZIP="$APP_DIR/htmfiles.zip"
BACKEND_DIR="$APP_DIR/SolvedCCG.Api"

# Step 1: Backup current backend and frontend directories
BACKUP_DIR="/root/backup_$(date +%F_%T)"
mkdir -p $BACKUP_DIR

# Backup frontend
if [ -d "$FRONTEND_DIR" ]; then
  zip -r "$BACKUP_DIR/htmfiles_backup.zip" "$FRONTEND_DIR"
fi

# Backup backend
if [ -d "$BACKEND_DIR" ]; then
  zip -r "$BACKUP_DIR/backend_backup.zip" "$BACKEND_DIR"
fi

# Step 2: Extract new frontend files
if [ -f "$FRONTEND_ZIP" ]; then
  rm -rf "$FRONTEND_DIR"/*
  unzip "$FRONTEND_ZIP" -d "$FRONTEND_DIR"
  rm "$FRONTEND_ZIP"
fi

# Step 3: Extract new backend files
if [ -f "$BACKEND_ZIP" ]; then
  rm -rf "$BACKEND_DIR"/*
  unzip "$BACKEND_ZIP" -d "$BACKEND_DIR"
  rm "$BACKEND_ZIP"
fi

# Step 4: Run the .NET application
# Ensure dotnet is added to the PATH or specify full path to dotnet
export PATH="$PATH:/usr/share/dotnet"
cd "$BACKEND_DIR"
dotnet SolvedCCG.Api.dll --urls "http://*:8080"