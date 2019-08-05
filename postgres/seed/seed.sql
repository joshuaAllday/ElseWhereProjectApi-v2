BEGIN TRANSACTION;

INSERT into login (username, hash ) values('admin', '$2a$10$R89vASmfQM53mmSwglP4MOjnmi3MhVLJwDPBBENq4rHPm4/AfHbTi');
INSERT into articlepost (firstname, lastname, email, latitude, longitude, articletitle, tag, article, posted, likes, url ) values('joshua', 'allday', 'josh@icloud.com', '22', '-22', 'test number 1', 'Article', 'lorem ipsum', '2019-01-12', '3', 'null');

COMMIT;