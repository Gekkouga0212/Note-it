
Opis projektu
Note-it to aplikacja do zarządzania zadaniami, która umożliwia użytkownikom tworzenie, usuwanie i przeglądanie swoich zadań.
Aplikacja jest podzielona na frontend i backend, co pozwala na lepszą organizację kodu i łatwiejsze zarządzanie projektem.

Technologie
Frontend
 Vue.js: Framework JavaScript do budowania interfejsów użytkownika.
 Vuex: Stan aplikacji oparty na wzorcu Flux dla Vue.js.
 Vue Router: Router do zarządzania nawigacją w aplikacjach Vue.js.
 Axios: Biblioteka do wykonywania zapytań HTTP.
Backend
 Node.js: Środowisko uruchomieniowe JavaScript na serwerze.
 Express.js: Framework webowy dla Node.js.
 Mongoose: Biblioteka do zarządzania bazą danych MongoDB.
 JWT (JSON Web Token): Biblioteka do uwierzytelniania i autoryzacji użytkowników.

Architektura
Frontend
Frontend aplikacji jest zbudowany z komponentów Vue.js, co umożliwia tworzenie modularnych i łatwych do zarządzania części interfejsu użytkownika.
Użycie Vuex pozwala na centralne zarządzanie stanem aplikacji, co jest szczególnie przydatne w większych projektach. Vue Router umożliwia nawigację pomiędzy różnymi widokami aplikacji.

Backend
Backend aplikacji opiera się na Node.js i Express.js, co pozwala na szybkie tworzenie serwerów HTTP i zarządzanie różnymi trasami.
Mongoose służy do komunikacji z bazą danych MongoDB, umożliwiając tworzenie, odczytywanie, aktualizowanie i usuwanie dokumentów w bazie danych.
JWT jest używany do uwierzytelniania użytkowników, co zapewnia bezpieczny dostęp do zasobów aplikacji.

Funkcjonalności
Rejestracja i logowanie użytkowników
Dodawanie nowych zadań
Usuwanie zadań
Przeglądanie listy zadań
Sortowanie zadań po dacie, kategorii i statusie ukończenia
Edycja danych użytkownika
Dodawanie nowych kategorii zadań
usuwanie kategorii zadań

Struktura projektu
Frontend (Vue.js)
src/
assets/ - pliki statyczne (np. obrazy)
components/ - komponenty Vue.js
router/ - konfiguracja Vue Router
store/ - konfiguracja Vuex
views/ - widoki aplikacji
App.vue - główny komponent aplikacji
main.js - plik wejściowy aplikacji

Backend (Node.js/Express.js)
controllers/ - logika biznesowa aplikacji
models/ - definicje modeli Mongoose
routes/ - trasy Express.js
middlewares/ - middleware dla aplikacji
server.js - główny plik serwera
