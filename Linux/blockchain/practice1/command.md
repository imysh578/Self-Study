## commands
- mineBlock
  : ``` curl -H "Content-type:application/json" --data "{\"$key\" : [\"$value\"]}" http://localhost:${port}/mineBlock ```
  `-k` key of data
  `-v` value of value
  `-p` port
- blocks
  : ``` curl -X GET http://localhost:${port}/blocks | python3 -m json.tool ```
  `-p` port
```
./command.sh 
```