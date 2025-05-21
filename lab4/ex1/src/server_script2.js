/**
 * @fileOverview Serwer HTTP obsługujący księgę gości, pozwalający na wyświetlanie i dodawanie wpisów.
 * @author Pawo0
 * @version 1.0.0
 * @requires http
 * @requires fs
 * @requires url
 */

import http from "node:http";
import { URL } from "node:url";
import fs from "node:fs";

/**
 * Funkcja obsługująca żądania przychodzące do serwera HTTP.
 * Zawiera logikę dla różnych ścieżek URL:
 * - GET /: Wyświetla stronę główną z księgą gości
 * - GET /submit: Dodaje nowy wpis do księgi gości i przekierowuje na stronę główną
 *
 * @function requestListener
 * @param {http.IncomingMessage} request - Obiekt zawierający informacje o żądaniu
 * @param {http.ServerResponse} response - Obiekt używany do wysyłania odpowiedzi
 * @returns {void}
 */
function requestListener(request, response) {
    console.log("--------------------------------------");
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log("--------------------------------------");
    // Create the URL object
    const url = new URL(request.url, `http://${request.headers.host}`);
    /* ************************************************** */
    // if (!request.headers['user-agent'])
    if (url.pathname !== "/favicon.ico")
        // View detailed URL information
        console.log(url);

    /* *************** */
    /* "Routes" / APIs */
    /* *************** */

    const route = [request.method, url.pathname].join(" ");
    switch (route) {
        /**
         * Obsługa głównej strony - wyświetla księgę gości
         * Odczytuje dane z pliku JSON i renderuje HTML z listą wszystkich wpisów
         * oraz formularz do dodawania nowych wpisów
         */
        case "GET /":
            const data = fs.readFileSync("./data/ksiega.json", "utf-8");
            const ksiegaGosci = JSON.parse(data);


            /* ************************************************** */
            // Creating an answer header — we inform the browser that the returned data is HTML
            /* ************************************************** */
            response.writeHead(200, { "Content-Type": "text/html" });
            /* ************************************************** */
            // Setting a response body
            response.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ksiega gosci</title>
  </head>
  <body>
    <main>
      <h1>Ksiega gosci</h1>
      <div>
        ${ksiegaGosci.map((line) => `<h3>${line.name}</h3><p>${line.tresc}</p><br />`).join("")}
      </div>
      <form method="GET" action="/submit">
        <label for="name">Twoje imie i naswisko</label>
        <input name="name" value="" placeholder="Jan Kowalski" required>
        <br />
        
        <label for="tresc">Twoja tresc</label>
        <textarea name="tresc" rows="5" cols="40" required></textarea>
        <br />
        
        <input type="submit" value="Zapisz">
      </form>
    </main>
  </body>
</html>`);
            /* ************************************************** */
            response.end(); // The end of the response — send it to the browser
            break;

        /**
         * Obsługa dodawania nowego wpisu do księgi gości
         * Pobiera dane z formularza, zapisuje je do pliku JSON
         * i przekierowuje użytkownika z powrotem na stronę główną
         */
        case "GET /submit":
            const recieveData = url.searchParams;
            const name = recieveData.get("name");
            const tresc = recieveData.get("tresc");
            console.log(recieveData)

            const newEntry = {
                name: name,
                tresc: tresc
            }

            const lista = JSON.parse(fs.readFileSync("./data/ksiega.json", "utf-8"));

            fs.writeFileSync("./data/ksiega.json", JSON.stringify([...lista, newEntry], null, 2));

            // redirect to the main page
            response.writeHead(302, { Location: "/" });
            response.end();
            break;

        /**
         * Obsługa nieznanych ścieżek - zwraca kod 501 Not Implemented
         */
        default:
            response.writeHead(501, { "Content-Type": "text/plain" });
            response.write("Error 501: Not implemented");
            response.end();
    }
}

/**
 * Tworzy i uruchamia serwer HTTP na porcie 8000
 * @constant {http.Server} server - Instancja serwera HTTP
 */
const server = http.createServer(requestListener); // The 'requestListener' function is defined above
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');