BEGIN TRANSACTION;

CREATE TABLE login (
    id serial PRIMARY Key, 
    username Text UNIQUE NOT NULL, 
    hash VARCHAR(100) NOT NULL  
);

COMMIT;