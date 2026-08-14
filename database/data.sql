
-- Horror VVatch Initial Seed Data
-- Used for development and API testing.

-- Media data
INSERT INTO media
(
    tmdb_id, 
    media_type, 
    title, 
    summary, 
    release_date, 
    poster_path, 
    runtime_minutes
)
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

-- Horror category data
INSERT INTO horror_category
(category_name)
VALUES
('Slasher'),
('Gore'),
('Home Invasion'),
('Supernatural'),
('Paranormal'),
('Religious Horror'),
('Possession'),
('Demonic Horror'),
('Folk Horror'),
('Creature Feature'),
('Monster'),
('Zombie'),
('Vampire'),
('Werewolf'),
('Witches'),
('Apocalyptic'),
('Body Horror'),
('Found Footage'),
('Horror Comedy'),
('Cosmic Horror'),
('Gothic Horror'),
('Psychological Horror'),
('Revenge'),
('Final Girl'),
('Good for Her'),
('Liminal Horror');

-- Media horror category data
INSERT INTO media_horror_category
(media_id, category_id)
VALUES
-- The Shining
(1, 22), -- Psychological Horror
(1, 4),  -- Supernatural

-- Backrooms
(2, 22), -- Psychological Horror
(2, 4),  -- Supernatural
(2, 26), -- Liminal Horror

-- Obsession
(3, 22), -- Psychological Horror
(3, 4),  -- Supernatural

-- The Witch
(4, 9),  -- Folk Horror
(4, 22), -- Psychological Horror
(4, 15), -- Witches
(4, 25), -- Good for Her

-- Hereditary
(5, 9),  -- Folk Horror
(5, 22), -- Psychological Horror
(5, 15), -- Witches
(5, 7),  -- Possession
(5, 8),  -- Demonic Horror
(5, 4),  -- Supernatural

-- Supernatural
(6, 11), -- Monster
(6, 22), -- Psychological Horror
(6, 4),  -- Supernatural
(6, 10), -- Creature Feature
(6, 5),  -- Paranormal

-- Buffy the Vampire Slayer
(7, 13), -- Vampire
(7, 24), -- Final Girl
(7, 15), -- Witches
(7, 4),  -- Supernatural
(7, 11), -- Monster
(7, 19), -- Horror Comedy

-- From
(8, 9),  -- Folk Horror
(8, 22), -- Psychological Horror
(8, 4),  -- Supernatural
(8, 11), -- Monster
(8, 26), -- Liminal Horror

-- It: Welcome to Derry
(9, 17), -- Body Horror
(9, 11), -- Monster
(9, 22), -- Psychological Horror
(9, 4),  -- Supernatural
(9, 10), -- Creature Feature
(9, 20), -- Cosmic Horror

-- Midnight Mass
(10, 22), -- Psychological Horror
(10, 4),  -- Supernatural
(10, 13), -- Vampire
(10, 6);  -- Religious Horror

-- Content warning data
INSERT INTO content_warning
(warning_name)
VALUES
('Violence'),
('Graphic Violence'),
('Blood'),
('Murder'),
('Torture'),
('Abuse'),
('Domestic Abuse'),
('Assault'),
('Sexual Assault'),
('Sexual Content'),
('Nudity'),
('Self Harm'),
('Suicide'),
('Addiction'),
('Drug Use'),
('Alcohol Use'),
('Animal Harm'),
('Animal Death'),
('Child Harm'),
('Child Death'),
('Pregnancy / Pregnancy Loss'),
('Eating Disorders'),
('Psychological Distress'),
('PTSD / Trauma'),
('Kidnapping / Abduction'),
('Stalking'),
('Natural Disasters'),
('Claustrophobia'),
('Needles / Medical Procedures'),
('Flashing Lights');

-- Media content warning data
INSERT INTO media_content_warning
(media_id, warning_id)
VALUES
-- The Shining
(1, 1),  -- Violence
(1, 3),  -- Blood
(1, 4),  -- Murder
(1, 6),  -- Abuse
(1, 7),  -- Domestic Abuse
(1, 23), -- Psychological Distress

-- Backrooms
(2, 1),  -- Violence
(2, 23), -- Psychological Distress
(2, 28), -- Claustrophobia

-- Obsession
(3, 1),  -- Violence
(3, 3),  -- Blood
(3, 4),  -- Murder
(3, 8),  -- Assault
(3, 23), -- Psychological Distress
(3, 26), -- Stalking

-- The Witch
(4, 1),  -- Violence
(4, 3),  -- Blood
(4, 4),  -- Murder
(4, 17), -- Animal Harm
(4, 18), -- Animal Death
(4, 19), -- Child Harm
(4, 20), -- Child Death
(4, 23), -- Psychological Distress

-- Hereditary
(5, 1),  -- Violence
(5, 2),  -- Graphic Violence
(5, 3),  -- Blood
(5, 20), -- Child Death
(5, 23), -- Psychological Distress
(5, 24), -- PTSD / Trauma

-- Supernatural
(6, 1),  -- Violence
(6, 2),  -- Graphic Violence
(6, 3),  -- Blood
(6, 4),  -- Murder
(6, 5),  -- Torture
(6, 23), -- Psychological Distress

-- Buffy the Vampire Slayer
(7, 1),  -- Violence
(7, 3),  -- Blood
(7, 4),  -- Murder
(7, 10), -- Sexual Content
(7, 23), -- Psychological Distress

-- From
(8, 1),  -- Violence
(8, 2),  -- Graphic Violence
(8, 3),  -- Blood
(8, 4),  -- Murder
(8, 19), -- Child Harm
(8, 23), -- Psychological Distress
(8, 24), -- PTSD / Trauma

-- It: Welcome to Derry
(9, 1),  -- Violence
(9, 2),  -- Graphic Violence
(9, 3),  -- Blood
(9, 4),  -- Murder
(9, 19), -- Child Harm
(9, 20), -- Child Death
(9, 23), -- Psychological Distress

-- Midnight Mass
(10, 1),  -- Violence
(10, 3),  -- Blood
(10, 4),  -- Murder
(10, 16), -- Alcohol Use
(10, 17), -- Animal Harm
(10, 18), -- Animal Death
(10, 23); -- Psychological Distress
