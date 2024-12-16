#! /bin/bash

npm install
cp .env.example .env
cp colors.json.example colors.json

npm run build

echo "Done!"