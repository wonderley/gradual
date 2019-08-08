#! /bin/bash
docker run -v `pwd`/db:/docker-entrypoint-initdb.d/:ro -p 27017:27017 mongo