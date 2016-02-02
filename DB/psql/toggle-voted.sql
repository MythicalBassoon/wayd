UPDATE emails SET voted = 'true' WHERE id = $1;

SELECT voted from emails where id = $1;