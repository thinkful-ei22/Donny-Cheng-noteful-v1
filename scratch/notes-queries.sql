
--SELECT ALL NOTES

SELECT * FROM notes;

--Select on notes and limit to five

SELECT * FROM notes
    LIMIT 5;

--Select all the notes and change the sort order - CREATION DATES ASCENDING

SELECT * FROM notes
   ORDER BY created ASC;

--Select sort order - ASCENDING LPHABETICAL ORDER

SELECT * FROM notes
   ORDER BY title ASC;


--Select notes where title matches exactly a string
SELECT * FROM notes
WHERE title = 'STRING';


--Select notes where title is LIKE a string. In other words the title contains the word or phrase (e.g cats or ways)

SELECT * FROM notes
WHERE title LIKE 'STRING';

--Update the title and content of a specific note
UPDATE notes
    SET title= 'new title'
    SET content = 'new content'
    WHERE id = noteId;

--Insert a new note. Try providing incomplete data like missing content or title fields.

INSERT INTO notes
    (title,content) VALUES
    ('10 Strange Cats', '1. Big cats 2. Long cats 3. Small cats 4. Fat cats 5. Baby cats 6. Orange Cats 7. WildCats 8. Fake Cats 9. 10.');


--Delete a note by id
DELETE from notes WHERE id = noteId;






