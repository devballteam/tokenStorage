#Temporary token storage
This is server which help share tokens per environments between two or more machines.

##Setup server:
    ```
    npm install
    node index.js (or pm2 start index.js --name tokenStorage)
    ```

##Usage:
###Save token:
    ```
    POST localhost:3001/{ENV_NAME}/{TOKEN}
    ```
where {ENV_NAME} is environment name and {TOKEN} is value of token to store.
CURL example:
    ```
    curl -X POST http://localhost:3001/dev/testtoken
    ```

###Read token:
    ```
    GET localhost:3001/{ENV_NAME}
    ```
where {ENV_NAME} is environment name
