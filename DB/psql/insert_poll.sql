INSERT INTO polls (vote_count, num_participants, user_id, event_id)
VALUES ($1, $2, $3, $4, $5, $6);

SELECT id from polls where user_id= $5 and event_id= $6;