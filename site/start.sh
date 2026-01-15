#!/bin/bash

# Script de lancement rapide du site
# Usage: ./start.sh ou bash start.sh

cd /Users/pierre/gpdt/site

# Charger nvm et utiliser Node 20
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

# Lancer le serveur de développement
npm run dev
