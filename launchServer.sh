# Don't forget to add execution permission to this file to launch it

mkdir -p data/db
mongod --dbpath ./data/db &
sleep 10
cd serveur && npm i && node serverCrudWithMongo.js &