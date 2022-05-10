#!/usr/bin/env bash

set -euox pipefail

pgrep -l node -a | grep [s]velte-kit | cut -d ' ' -f1 | xargs kill
