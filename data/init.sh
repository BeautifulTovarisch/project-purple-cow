#!/bin/bash

set -euo pipefail

# Initialization script for proof-of-concept 'items' table.
# NOTE: Proper migrations/schemata should be defined when requirements are
# better understood.

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<EOSQL
  -- Owned by superuser
  CREATE DATABASE proj_purple_cow;

  CREATE USER dev_user WITH password 'dev_password';
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "proj_purple_cow" <<EOSQL
  -- Create schema ppc, items table
  CREATE SCHEMA IF NOT EXISTS ppc;

  CREATE TABLE ppc.items (
    id    INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name  TEXT
  );

  GRANT USAGE ON SCHEMA ppc to dev_user;
  GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON ppc.items TO dev_user;
EOSQL
