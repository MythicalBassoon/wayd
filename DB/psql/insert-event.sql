INSERT INTO events (title, description, start_time, stop_time, category, address, city, state, lat, long, source, source_id, image_thumb, image_medium) 
SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
WHERE NOT EXISTS (SELECT 1 FROM events WHERE source_id=$12);

SELECT id from events where source_id = $12;