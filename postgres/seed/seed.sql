BEGIN TRANSACTION;

INSERT into login (username, hash ) values('admin', '$2a$10$R89vASmfQM53mmSwglP4MOjnmi3MhVLJwDPBBENq4rHPm4/AfHbTi');

COMMIT;