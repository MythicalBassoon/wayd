INSERT INTO polls (event_id, user_id, num_participants, yes_count, no_count)
VALUES ($1, $2, $3, 0, 0);

SELECT id from polls where user_id= $2 and event_id= $1;