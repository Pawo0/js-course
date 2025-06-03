import { MongoClient } from "npm:mongodb@5.6.0";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";
await config({ export: true, path: ".env" });

const MONGODB_URI = Deno.env.get("MONGODB_URI") || "";
const DB_NAME = Deno.env.get("DB_NAME")?.toUpperCase() || "";


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

    const sampleStudents = [
      {
        fname: "Jan",
        lname: "Kowalski",
        faculty: "WI",
      },
      {
        fname: "Anna",
        lname: "Nowak",
        faculty: "WIET",
      },
      {
        fname: "Piotr",
        lname: "Zielinski",
        faculty: "WIMiR",
      },
      {
        fname: "Katarzyna",
        lname: "Wojcik",
        faculty: "WIET",
      },
      {
        fname: "Marek",
        lname: "Lewandowski",
        faculty: "WI",
      },
      {
        fname: "Magdalena",
        lname: "Kowalczyk",
        faculty: "WIET",
      },
      {
        fname: "Tomasz",
        lname: "Szymanski",
        faculty: "WIMiR",
      },
      {
        fname: "Agnieszka",
        lname: "Krawczyk",
        faculty: "WI",
      },
      {
        fname: "Michał",
        lname: "Witkowski",
        faculty: "WIET",
      },
      {
        fname: "Ewa",
        lname: "Jankowska",
        faculty: "WIMiR",
      },
    ];

    await studentsCollection.insertMany(sampleStudents);
    console.log("Dodano przykładowe dane do kolekcji students");
  } else {
    console.log(`Kolekcja students zawiera już ${count} dokumentów`);
  }
}


await initializeData();

export { db, studentsCollection };
