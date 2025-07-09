-- BDD PASSAGES
--**************


-- TABLE ACTIVITIES (6 activités)
CREATE TABLE activities(
	id SERIAL PRIMARY KEY,
	activity_type TEXT
);

INSERT INTO activities (activity_type)
VALUES
('Un café/thé'),
('Un repas'),
('Une promenade'),
('Une sortie culturelle'),
('Un cinéma'),
('Autre activité');


-- TABLE CITIES  (10 cities)
CREATE TABLE cities(
	id SERIAL PRIMARY KEY,
	city_name TEXT NOT NULL UNIQUE
);

INSERT INTO cities (city_name)
VALUES
('Saint-Etienne'),
('Angers'),
('Aurillac'),
('Besançon'),
('Paris'),
('Toulouse'),
('Le Mans'),
('Lyon'),
('Quimper'),
('Bordeaux');



-- TABLE ELDERS  (15 elders)
CREATE TABLE elders (
	id SERIAL PRIMARY KEY,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT,
	age INT,
	job TEXT,
	city_id INTEGER,
	zipcode VARCHAR(5),
	activity_id INTEGER,
	description TEXT,
	picture TEXT,
	created_at CURRENT_TIMESTAMP,
	updated_at CURRENT_TIMESTAMP,
	FOREIGN KEY (city_id) REFERENCES cities(id),
	FOREIGN KEY (activity_id) REFERENCES activities(id)
);

CREATE TABLE elders (
id SERIAL PRIMARY KEY,
firstname TEXT NOT NULL,
lastname TEXT NOT NULL,
password TEXT NOT NULL,
email TEXT,
age INT,
job TEXT,
city_id INTEGER,
zipcode VARCHAR(5),
activity_id INTEGER,
description TEXT,
picture TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (city_id) REFERENCES cities(id),
FOREIGN KEY (activity_id) REFERENCES activities(id)
)


INSERT INTO elders (
  firstname, lastname, password, email, age, job, city_id, zipcode, activity_id, description, picture, created_at, updated_at
)
VALUES
('Franco', 'Moretti', 'franco123', 'franco.moretti@example.com', 95, 'Ouvrier d''usine', 1, 42000, 1, 'Franco adore raconter ses souvenirs de l''usine et partager un bon café avec les jeunes du quartier', '/images/danie-franco-ClHY-KyvI1M-unsplash.jpg', NOW(), NOW()),
('Soares', 'Fernandes', 'soares123', 'soares.fernandes@example.com', 84, 'Puéricultrice', 2, 49000, 2, 'Soares a consacré sa vie aux tout-petits et aime aujourd''hui transmettre tendresse et conseils de vie', '/images/vladimir-soares-z_8Jqe0Cc-s-unsplash.jpg', NOW(), NOW()),
('Tim', 'Durand', 'tim123', 'tim.durand@example.com', 80, 'Facteur', 3, 15000, 3, 'Ancien facteur, Tim connaît chaque recoin de sa ville et adore les longues balades en bonne compagnie', '/images/tim-mossholder-FRPbQvAwY10-unsplash.jpg', NOW(), NOW()),
('Shimo', 'Tanaka', 'shimo123', 'shimo.tanaka@example.com', 94, 'Professeure', 4, 25000, 1, 'Shimo a le cœur sur la main et des tas d’histoires passionnantes à raconter sur ses années d’enseignement.', '/images/shimo-yann-7nTFrV1xQGE-unsplash.jpg', NOW(), NOW()),
('Zanon', 'Bernard', 'zanon123', 'zanon.bernard@example.com', 86, 'Journaliste', 5, 75011, 4, 'Zanon est curieuse du monde et adore échanger autour d''un bon livre ou d’un article d’actualité.', '/images/tatiana-zanon-MMhazsT2wtM-unsplash.jpg', NOW(), NOW()),
('Matveev', 'Ivanov', 'matveev123', 'matveev.ivanov@example.com', 77, 'Pilote d''avion', 6, 31000, 4, 'Pilote à la retraite, Matveev a mille anecdotes à partager sur ses voyages aux quatre coins du monde.', '/images/michael-matveev-Bk8zT4gLLt0-unsplash.jpg', NOW(), NOW()),
('Mahe', 'Leclerc', 'mahe123', 'mahe.leclerc@example.com', 93, 'Mécanicienne', 7, 72000, 5, 'Mahe a les mains d’or et le sourire généreux. Elle aime parler de mécanique, mais surtout de lien humain.', '/images/quentin-mahe-a6jCS61X1Hg-unsplash.jpg', NOW(), NOW()),
('Samir', 'Haddad', 'samir123', 'samir.haddad@example.com', 82, 'Musicien', 8, 69007, 2, 'Musicien passionné, Samir aime improviser quelques notes et créer des moments chaleureux avec les jeunes.', '/images/mohammad-samir-huHXKc_usoA-unsplash.jpg', NOW(), NOW()),
('Nathalie', 'Gurtler', 'nathalie123', 'nathalie.gurtler@example.com', 87, 'Infirmière', 9, 29000, 3, 'Pratique l''aquarelle et adore les balades dans la nature, elle adorerait partager ses passions en se promenant.', '/images/nathalie-gurtler-goGkWvz32Gg-unsplash.jpg', NOW(), NOW()),
('Maksym', 'Mazur', 'maksym123', 'maksym.mazur@example.com', 79, 'Jardinier', 5, 75018, 1, 'Amateur de nature et de plantes, ce refugié politique aime raconter l''histoire de son pays', '/images/maksym-mazur-aJgAB_693_U-unsplash.jpg', NOW(), NOW()),
('Mariam', 'Benali', 'mariam123', 'mariam.benali@example.com', 90, 'Fleuriste', 10, 33000, 4, 'Mariam aime partager des moments autour de la culture et la dégustation de vins de Bordeaux.', '/images/mariam-IgOVPMd862s-unsplash.jpg', NOW(), NOW()),
('Jacques', 'Lemoine', 'jacques123', 'jacques.lemoine@example.com', 75, 'Comptable', 8, 69007, 2, 'Jacques est un fin gourmet et apprécie par dessus tout partager un bon repas.', '/images/Jacques-gWsC_F2hyFc-unsplash.jpg', NOW(), NOW()),
('Ahmed', 'Rahmani', 'ahmed123', 'ahmed.rahmani@example.com', 83, 'Architecte', 5, 75014, 3, 'Ahmed adore la ville et commenter les aménagements urbains lors de promenades.', '/images/ahmed-OR_4O3JqvTI-unsplash.jpg', NOW(), NOW()),
('Elise', 'Zaldo', 'elise123', 'elise.zaldo@example.com', 80, 'Cantatrice', 6, 31000, 1, 'Elise adore retrouver des gens dans un café et raconter ses souvenirs de chanteuse lyrique.', '/images/gaspar-zaldo-Dc_IIWOrRmg-unsplash.jpg', NOW(), NOW()),
('Michel', 'Dulac', 'dulac45', 'dulacm@hotmail.com', 90, 'Ecrivain', 2, 49000, 4, 'Michel a consacré sa vie à l''écriture de romans historiques et aimerait partager ses connaissances sur le vieux Angers.', '/images/tom-morbey-iuD2UOm-EUk-unsplash.jpg', NOW(), NOW());

-- TABLE ROLES
CREATE TABLE roles(
id SERIAL PRIMARY KEY,
role_id INTEGER,
);

INSERT INTO roles (role_id)
VALUES
('admin'),
('volunteer'),
('volunteer_onhold');

-- TABLE VOLUNTEERS
CREATE TABLE volunteers (
	id SERIAL PRIMARY KEY,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	role TEXT,
	password TEXT,
	email TEXT,
	city_id INTEGER,
	zipcode VARCHAR(5),
	url_image TEXT,
	activity_id INTEGER,
	FOREIGN KEY (city_id) REFERENCES cities(id),
	FOREIGN KEY (activity_id) REFERENCES activities(id)
);

INSERT INTO volunteers (firstname, city_id, zipcode, activity_id)
VALUES
('Helene', 'Leduc', 5, 75018, 1),
('Thomas', 'Lefranc', 6, 31000, 4),
('Lucie', 'Fernandez', 8, 67009, 2),
('Julia', 'Fellini', 9, 29000, 3),
('Jean', 'Smith', 10, 33000, 4),
('Alice', 'Nevers', 2, 49000, 3),
('Robert', 'Delon', 1, 42000, 1);



-- TABLE MOMENTS  (table de jointure)
CREATE TABLE moments (
    id SERIAL PRIMARY KEY,
    elder_id INTEGER,
    volunteer_id INTEGER,
	activity_id INTEGER,
	city_id INTEGER,
	FOREIGN KEY (elder_id) REFERENCES elders(id),
    FOREIGN KEY (volunteer_id) REFERENCES volunteers(id),
	FOREIGN KEY (activity_id) REFERENCES activities(id),
	FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- FK : les relations se font via l'organisation de "moments", pas entre elders et volunteers directement.
-- les FK sont toutes reliées aux id des autres tables
INSERT INTO moments(elder_id, volunteer_id, activity_id, city_id)
VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 4, 3, 3),
(4, 3, 1, 4),
(5, 5, 4, 5),
(6, 2, 4, 6);

-- (on insère les ids des activités et villes au lieu de les écrire en dur)



