# vet-clinic
**Zadanie**
Zbudować aplikację backendową w Express.js deployowaną z repo na githubie na heroku.com połączoną z bazą danych PSQL na heroku.

**Opis**
Aplikacja ma obsługiwać klinikę weterynaryjną. 
Baza danych ma zawierać dwie tabele: users, animals.


**users**

Tabela zawiera dane dotyczące klientów kliniki. 
Wymagane dane to: id, imię, nazwisko, pesel, adres, miasto, telefon, email, hasło (zahashowane), czy-aktywny, (utworzono, aktualizowano).

**animals**
Tabela zawiera dane leczonych zwierząt. 
Wymagane dane to: id, rodzaj, imię, data urodzenia, data zgonu, ostatnia wizyta, choroby (tablica z id chorób), data ostatniego szczepienia, id właściciela, czy-aktywny, (utworzono, aktualizowano).

**Wymagania**
Aplikacja ma mieć możliwość dodawania, edycji, podejrzenia poszczególnych rekordów. Nie ma możliwości usunięcia rekordu - a jedynie przełączenia "czy-aktywny" na fałsz.
Oczywiście jeden właściciel może mieć kilka zwierzaków.
Wszystkie requesty na endpointy bez nagłówka z autoryzacją (zahashowane hasło) będą odrzucane.

Chcemy mieć możliwość pobrania użytkownika z listą jego zwierzaków w postaci JSON.

**Do wykorzystania:**
Node.js, 
Express.js, 
Sequalize ORM, 
PostgreSQL 
Heroku.com
GitHub
Postman