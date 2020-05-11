#!/bin/bash

# 1. Install SecretHub
  mkdir -p ./secrethub
  wget https://github.com/secrethub/secrethub-cli/releases/download/v0.37.0/secrethub-v0.37.0-linux-amd64.tar.gz
  tar -zxvf secrethub-v0.37.0-linux-amd64.tar.gz -C ./secrethub
  chmod +x secrethub/bin/secrethub
  rm secrethub-v0.37.0-linux-amd64.tar.gz
  export PATH="$PWD/secrethub/bin:$PATH"
