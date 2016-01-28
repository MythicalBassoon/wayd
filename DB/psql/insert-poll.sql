INSERT INTO polls (vote_count, num_participants, user_id, event_id)
VALUES ($1, $2, $3, $4);

SELECT id from polls where user_id= $3 and event_id= $4;