echo "Hello Mongo!"
mongoimport --host 127.0.0.1 --port 27017 --db gradual --collection logs --type json --file /docker-entrypoint-initdb.d`/sampleData.json