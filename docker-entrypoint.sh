#!/bin/sh
set -e

# Docs/27_DEPLOYMENT.md §44-47: migrations run as part of the deployment
# flow, using `prisma migrate deploy` (not `migrate dev`, which is
# interactive/dev-only) against the production database.
echo "Running database migrations..."
npx prisma migrate deploy

exec "$@"
