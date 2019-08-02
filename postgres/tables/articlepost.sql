BEGIN TRANSACTION;

CREATE TABLE articlepost (
    id serial PRIMARY Key, 
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email text,
    latitude float,
    longitude float, 
    articletitle text,
    tag text,
    article text, 
    posted DATE NOT NULL,
    likes BIGINT DEFAULT 0,
    url text
);

COMMIT;