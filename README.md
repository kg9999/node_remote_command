# node_remote_command

A Nodejs Socket Remote Control. Different Clients connect to one server where commands can be issued to those clients.

How to rum
  - Run client of remote machine
    - run npm install in client
    - Either run npm --uri=URI start or node index.js URI
  - Run server to coonect to clients.
    - run npm install in server
    - Either run npm start --port=PORT or node index.js PORT
    
How it works
  - The Client will establish a socket connection to the server
  - You issue commands to the server via -POST /api/command  
  - Server sends command to client and wait for a response
