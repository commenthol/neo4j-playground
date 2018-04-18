#!/bin/bash

CWD=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

docker run \
  -d \
  --name neo4j \
  --publish=7474:7474 \
  --publish=7687:7687 \
  --volume=$CWD/../data:/data \
  neo4j
