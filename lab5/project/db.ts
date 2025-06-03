import { MongoClient } from "npm:mongodb@5.6.0";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
await config({ export: true, path: ".env" });

const MONGODB_URI = Deno.env.get("MONGODB_URI") || "";
const DB_NAME = Deno.env.get("DB_NAME")|| "";


if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set");
    Deno.exit(1);
}

const client = new MongoClient(MONGODB_URI);

try {
    await client.connect();
    await client.db(DB_NAME).command({ ping: 1 });
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
    Deno.exit(1);
}

const db = client.db(DB_NAME);
const studentsCollection = db.collection("students");

async function initializeData() {
    const count = await studentsCollection.countDocuments();

    if (count === 0) {
        console.log("Inicjalizacja danych w kolekcji students...");

        const sampleStudents = {
            "Adamczyk Czech": {
                "Matematyka": [
                    5,
                    5
                ],
                "Fizyka": [
                    4,
                    1,
                    4,
                    6
                ],
                "Chemia": [
                    3
                ]
            },
            "Jan Kowalski": {
                "Matematyka": [
                    5
                ],
                "Fizyka": [
                    4,
                    6,
                    2
                ],
                "Chemia": [
                    3,
                    3
                ]
            },
            "Jan Nowak": {
                "Matematyka": [
                    2,
                    5
                ]
            },
            "Adam Nowak": {
                "Fizyka": [
                    4
                ],
                "Chemia": [
                    5
                ],
                "Matematyka": [
                    6
                ]
            },
            "Krzysztof Kolumb": {
            }
        }

        await studentsCollection.insertOne(sampleStudents);
        console.log("Dodano przykładowe dane do kolekcji students");
    } else {
        console.log(`Kolekcja students zawiera już ${count} dokumentów`);
    }
}


await initializeData();

export { db, studentsCollection };
