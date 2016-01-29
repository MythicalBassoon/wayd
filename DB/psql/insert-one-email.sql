INSERT INTO emails (email, poll_id)
VALUES ($1, $2);

SELECT id from emails where email= $1 and poll_id= $2;