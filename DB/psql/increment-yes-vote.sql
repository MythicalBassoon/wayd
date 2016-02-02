UPDATE polls SET yes_count = (yes_count + 1) WHERE id = $1;

SELECT yes_count from polls where id = $1;