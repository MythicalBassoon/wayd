UPDATE polls SET no_count = no_count + 1 WHERE id = $1;

SELECT no_count from polls where id = $1;