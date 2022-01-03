#!/bin/bash

kill -9 `ps -ef | grep httpServer.js | grep node | awk '{print $2}'`
node httpServer.js &
