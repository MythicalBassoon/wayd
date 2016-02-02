INSERT INTO users (first_name, last_name, user_name, password, access_token)
SELECT $1, $2, $3, $4, $5
WHERE NOT EXISTS (SELECT 1 FROM users WHERE user_name=$3);

SELECT id from users where access_token = $5 or user_name = $3;