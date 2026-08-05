-- -----------------------------------------------------
-- Horror VVatch Initial Seed Data
-- -----------------------------------------------------
-- Used for development and API testing.

INSERT INTO media
(tmdb_id, 
media_type, 
title, summary, 
release_date, 
poster_path, 
runtime_minutes)
VALUES
(
694, 
'MOVIE', 
'The Shining',
'A family spends the winter in an isolated hotel.',
'1980-05-23', 
NULL, 
146 
),

(
695, 
'MOVIE', 
'Backrooms', 
'After a therapist''s patient disappears into a dimension beyond reality, she must venture into the unknown to save him.',
'2026-05-29',
NULL,
110
),

(
696,
'MOVIE',
'Obsession',
'Baron "Bear" Bailey breaks a novelty charm to force his co-worker Nikki Freeman to love him, but the supernatural compulsion warps her mind into violent obsession, trapping him in a nightmare he cannot wish away.',
'2026-05-15',
NULL,
109 
),

(
697,
'MOVIE',
'The Witch',
'An isolated Puritan family in 1630s New England comes unraveled by the forces of witchcraft and possession.',
'2026-02-19',
NULL,
92
),

(
698,
'MOVIE',
'Hereditary',
'A grieving family is haunted by tragic and disturbing occurrences.',
'2018-06-08',
NULL,
127
);

INSERT INTO media
(tmdb_id, 
media_type, 
title, 
summary, 
release_date, 
poster_path, 
number_of_seasons, 
number_of_episodes)
VALUES
(
1388, 
'TV_SHOW', 
'Supernatural',
'Two brothers hunt monsters.',
'2005-09-13',
NULL,
15,
327
),

(
1389,
'TV_SHOW',
'Buffy the Vampire Slayer',
'A young woman, destined to slay vampires, demons and other infernal creatures',
'1997-03-10',
NULL,
7,
144
),

(
1390,
'TV_SHOW',
'From',
'A town with a hidden secret experiences strange occurrences that intensify at night.',
'2022-02-20',
NULL,
4,
40
),

(
1391,
'TV_SHOW',
'It: Welcome to Derry',
'In 1962, a couple with their son move to Derry, Maine just as a young boy disappears.',
'2025-10-26',
NULL,
1,
8
),

(
1392,
'TV_SHOW',
'Midnight Mass',
'An isolated island community experiences miraculous events - and frightening omens - after the arrival of a charismatic, mysterious young priest.',
'2021-09-24',
NULL,
1,
7
);


