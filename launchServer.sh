# Don't forget to add execution permission to this file to launch it

mkdir -p data/db
mongod --dbpath ./data/db &
mongoimport --db test --collection restaurants --drop --file dataset.json &
cd serveur && npm i && node serverCrudWithMongo.js &