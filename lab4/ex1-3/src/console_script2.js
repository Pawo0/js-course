/**
 * @fileOverview Skrypt konsolowy pozwalający na wykonywanie poleceń systemowych oraz
 * inkrementację i wyświetlanie licznika uruchomień z pliku counter.txt.
 * @author Pawo0
 * @version 1.0.0
 */

import fs from 'node:fs';
import { argv } from 'node:process';
import { exec } from 'node:child_process';
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

/**
 * Rekurencyjnie pobiera i wykonuje polecenia systemowe od użytkownika.
 * Polecenia są wykonywane asynchronicznie, a wyniki wyświetlane w konsoli.
 * Funkcja kończy działanie po wpisaniu polecenia 'exit'.
 *
 * @function
 * @returns {void}
 */
function executeCommand() {
    const command = prompt("> ")

    if (command === 'exit') {
        console.log("Exiting...");
        return;
    }
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        console.log(stdout);
        executeCommand();
    });
}

/**
 * Synchronicznie odczytuje zawartość pliku counter.txt,
 * inkrementuje wartość o 1, zapisuje nową wartość do pliku
 * i wyświetla aktualną liczbę uruchomień.
 *
 * @function
 * @returns {void}
 */
function readFileSync() {
    console.log("Reading file synchronously...");

    const curr = fs.readFileSync("./counter.txt", 'utf-8')
    fs.writeFileSync("./counter.txt", `${parseInt(curr) + 1}`)

    console.log(`Liczba uruchomien: ${parseInt(curr) + 1}`)
}

/**
 * Asynchronicznie odczytuje zawartość pliku counter.txt,
 * inkrementuje wartość o 1, zapisuje nową wartość do pliku
 * i wyświetla aktualną liczbę uruchomień.
 *
 * @function
 * @returns {void}
 */
function readFileAsync() {
    console.log("Reading file asynchronously...");

    fs.readFile("./counter.txt", 'utf-8', (err, data) => {
        if (err) throw err;
        const curr = data
        fs.writeFile("./counter.txt", `${parseInt(curr) + 1}`, (err) => {
            if (err) throw err;
            console.log(`Liczba uruchomien: ${parseInt(curr) + 1}`)
        })
    })
}

/**
 * Główna funkcja programu. Sprawdza istnienie pliku counter.txt
 * i przetwarza opcje przekazane jako argumenty wiersza poleceń:
 * - bez argumentu: tryb interaktywny z poleceniami systemowymi
 * - --sync: synchroniczny odczyt/zapis licznika
 * - --async: asynchroniczny odczyt/zapis licznika
 *
 * @function
 * @returns {void}
 */
function main(){
    const option = argv[2]
    if (!fs.existsSync("./counter.txt")) {
        fs.writeFileSync("./counter.txt", "0")
    }

    if (!option){
        console.log("Now you can use system commands, type 'exit' to exit")
        executeCommand()
    }
    else if (option === '--sync') {
        readFileSync();
    } else if (option === '--async') {
        readFileAsync()
    } else {
        console.log('Invalid option. Use --sync or --async.')
    }
}

main()