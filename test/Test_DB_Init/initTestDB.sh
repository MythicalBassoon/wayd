#!/bin/bash
dropdb testwayd
pg_dump wayd > ./testwayd.sql
createdb testwayd
psql -d testwayd -f ./testwayd.sql