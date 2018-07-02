DROP TABLE IF EXISTS notes;
SELECT CURRENT_DATE;


--Create Table

CREATE TABLE notes(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now()
);


ALTER SEQUENCE notes_id_seq RESTART WITH 1000;

--DUMMY DATA
INSERT INTO notes (title, content) VALUES
    ('5 Cats you Can''t Miss', '1. Big cats 2. Long cats 3. Small cats 4. Fat cats 5. Baby cats'),
    ('My cat bit my face off', 'ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch ouch'),
    ('Cats and dogs', 'Even today, big cats such as tigers, lions, jaguars and leopards keep causing admiration and fear, but these magnificent beasts are dwarfed by some of their extinct relatives'),
    ('Ancient Cats were Gigantic', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
    ('Ancient Cats were Tiny', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
    ('Ancient Cats were Tiny', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
    ('Contemporary Cats are STUPID', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
    ('Ancient Cats were Tiny', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
    ('Ancient Cats were Tiny', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
    ('Ancient Cats were BIG', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
    ('Ancient Cats were STINKY', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. '),
   ('Ancient Cats were COOL', 'Before man became a hunter and made his way to the top of the food chain, the Felidae, or cats, were the most successful, powerful predators in most of the world. ')

    RETURNING id, title;
    


