-- deploy fresh database tables
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/articlepost.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql';
 
