#!/bin/bash
set -euox pipefail

cd /var/lib/codedeploy-apps/media-players

docker compose down
