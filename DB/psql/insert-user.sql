INSERT INTO users (first_name, last_name, user_name, password, access_token)
VALUES ($1, $2, $3, $4, $5, $6);

SELECT id from users where access_token = $6 or user_name = $3;