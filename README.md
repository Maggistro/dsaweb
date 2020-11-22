# DSA Web App

## Requirements
- docker
- docker-compose
- Windows/Linux ( Tested, should also work on IOs )

## Setup
- clone repository
- enter directory and `docker-compose up`
- service should be live under `localhost:80`

## Usage
- Be aware, pages are prerendered on first open. This may take a while
- Database is MongoDB, reachable under `localhost:27017` without auth
- To switch database use `.env.local` and change `DB_HOST`
