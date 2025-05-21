import http from "node:http";
import {URL} from "node:url";
import fs from "node:fs";

const requestListener = (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname !== "/favicon.ico")
        console.log(url);


    const route = [request.method, url.pathname].join(" ");
    console.log(`Route: ${route}`);

    switch (route) {
        case "GET /":
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>USOS</title>
    <!-- Tailwind JS -->
    <script
            src="https://cdn.tailwindcss.com"></script>
    <!-- Icons -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">


</head>
<body>

<main class="flex flex-col w-[80%] m-auto gap-5">
    <header class="bg-sky-200 flex gap-4 p-5 sm:justify-between flex-col md:flex-row">
        <div class=" flex gap-4 flex-col md:items-center md:flex-row ">

            <div class="flex justify-between w-full items-center md:w-fit">
                <h1 class="font-medium text-lg "><a href="/"> Dziekanat</a></h1>
                <button id="hamburger-btn"
                        class="hover:bg-sky-300 active:bg-sky-400 p-1 border border-gray-500 rounded-md md:hidden">
                    <svg class="size-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor">
                        <path class=" " style="background-color: red" stroke-linecap="round" stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </button>

            </div>
            <ul class="hamburger-wrap hidden flex gap-4 flex-col transition-all duration-300 md:flex-row md:flex">
                <li>Studia stacjonarne</li>
                <li>Studia niestacjonarne</li>
                <li>Pracownicy</li>
            </ul>
        </div>
        <h1 class="hamburger-wrap hidden font-medium text-lg justify-self-end md:block"><a href="/usos">USOS</a>
        </h1>
    </header>
    <h2 class="font-bold text-3xl px-5">Wydział informatyki</h2>
    <div id="container" class="border flex flex-col gap-5 items-center p-1 sm:flex-row ">
        <section class="border border-gray-500 rounded-xl w-[70%] flex-1 flex flex-col">
            <div class="p-5 bg-neutral-200 rounded-t-xl border-b border-gray-500">Jan Kowalski</div>
            <div class="">
                <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clip-rule="evenodd"/>
                </svg>
                Pracownik
            </div>
            <div class="p-5 bg-neutral-200 rounded-b-xl border-t border-gray-500">
                Karta 1
            </div>
        </section>
        <section class="border border-gray-500 rounded-xl w-[70%] flex-1 flex flex-col">
            <div class="p-5 bg-neutral-200 rounded-t-xl border-b border-gray-500">Anna Nowak</div>
            <div class="">
                <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clip-rule="evenodd"/>
                </svg>
                Student
            </div>
            <div class="p-5 bg-neutral-200 rounded-b-xl border-t border-gray-500">
                Karta 2
            </div>
        </section>
        <section class="border border-gray-500 rounded-xl w-[70%] flex-1 flex flex-col">
            <div class="p-5 bg-neutral-200 rounded-t-xl border-b border-gray-500">Jerzy Zmuda</div>
            <div class="">
                <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                          clip-rule="evenodd"/>
                </svg>
                Student
            </div>
            <div class="p-5 bg-neutral-200 rounded-b-xl border-t border-gray-500">
                Karta 3
            </div>
        </section>
    </div>
    <footer class="p-5 bg-sky-200">
        Adres e-mail
    </footer>
</main>

<script src="script.js"></script>
</body>
</html>
`)
            response.end()
            break;

        case "GET /script.js":
            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(`
const btn = document.getElementById('hamburger-btn');
const hamburgerElements = document.getElementsByClassName('hamburger-wrap');

btn.addEventListener('click', () =>{
    console.log('clicked')
    for (let item of hamburgerElements){
        item.classList.toggle("hidden")
    }
})
            `)
            response.end()
            break;

        case "GET /usos":
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>USOS</title>
    <!-- Tailwind JS -->
    <script
            src="https://cdn.tailwindcss.com"></script>
    <!-- Icons -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

    <!-- React -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>


</head>
<body>

<main class="flex flex-col w-[80%] m-auto gap-5">
    <header class="bg-sky-200 flex gap-4 p-5 sm:justify-between flex-col md:flex-row">
        <div class=" flex gap-4 flex-col md:items-center md:flex-row ">

            <div class="flex justify-between w-full items-center md:w-fit">
                <h1 class="font-medium text-lg "><a href="/"> Dziekanat</a></h1>
                <button id="hamburger-btn"
                        class="hover:bg-sky-300 active:bg-sky-400 p-1 border border-gray-500 rounded-md md:hidden">
                    <svg class="size-5 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor">
                        <path class=" " style="background-color: red" stroke-linecap="round" stroke-linejoin="round"
                              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                    </svg>
                </button>

            </div>
            <ul class="hamburger-wrap hidden flex gap-4 flex-col transition-all duration-300 md:flex-row md:flex">
                <li>Studia stacjonarne</li>
                <li>Studia niestacjonarne</li>
                <li>Pracownicy</li>
            </ul>
        </div>
        <h1 class="hamburger-wrap hidden font-medium text-lg justify-self-end md:block"><a href="/usos">USOS</a>
        </h1>
    </header>
    <div id="root">

    </div>

    <footer class="p-5 bg-sky-200">
        Adres e-mail
    </footer>
</main>

<script src="script.js"></script>
<script type="text/babel" data-type="module" src="react.js"></script>

</body>
</html>`)
            response.end()
            break;

        case "GET /react.js":
            response.writeHead(200, {"Content-Type": "text/javascript"});
            response.write(`
            import React from "https://esm.sh/react/?dev";
import ReactDOMClient from "https://esm.sh/react-dom/client/?dev";

const updateStudents = (students) => {
    fetch("/api/students/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(students),
    })
        .then((response) => {
            if (response.ok) {
                console.log("Students updated successfully");
            } else {
                console.error("Error updating students");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        })
}


function Button(props) {
    const {text, prop, handleButton, disabled = false} = props;

    return (
        <button type="button"
                className="text-white bg-gray-800 hver:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 disabled:opacity-50"
                onClick={(event) => prop ? handleButton(event, prop) : handleButton(event)}
                disabled={disabled}
        >
            {text}
        </button>
    )
}

function Menu(props) {
    const {inputValue, handleChange, handleButton, students} = props;

    return (
        <>

            <div className="flex">
                <select className="flex-1 border border-gray-300 rounded p-2" value={inputValue}
                        onChange={handleChange}>
                    <option value={"none"}>Choose student</option>
                    {students.map((student) => (
                        <option key={student} value={student}>
                            {student}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-4 items-center justify-center ">

                <Button text="Dodaj" prop="add" handleButton={handleButton}/>
                <Button text="Zamien" prop="change" handleButton={handleButton}/>
                <Button text="Wyswietl" prop="display" handleButton={handleButton}/>

            </div>
        </>
    )
}

function AddPage(props) {
    const {currentStudent, currentStudentData, setCurrentStudentData, subjects, students, setStudents} = props;
    const [selectedSubject, setSelectedSubject] = React.useState("");
    const [selectedGrade, setSelectedGrade] = React.useState("");

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedSubject === "none") {
            window.alert("Wybierz przedmiot");
            return;
        }
        if (selectedGrade === "") {
            window.alert("Wybierz ocene");
            return;
        }

        const updatedStudentData = {...currentStudentData};

        if (!updatedStudentData[selectedSubject]) {
            updatedStudentData[selectedSubject] = [];
        }

        const gradeAsNumber = Number(selectedGrade);
        updatedStudentData[selectedSubject].push(gradeAsNumber);

        setCurrentStudentData(updatedStudentData);

        const updatedStudents = {...students};
        updatedStudents[currentStudent] = updatedStudentData;
        setStudents(updatedStudents);

        
        updateStudents(updatedStudents);
        // localStorage.setItem("students", JSON.stringify(updatedStudents));

        setSelectedSubject("none");
        setSelectedGrade("");
        window.alert("Ocena została dodana");
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Dodaj ocene uzytkownikowi {currentStudent}</h1>
            <div className="flex flex-col gap-4 items-center justify-between">
                <span className="text-xl">Przedmiot</span>
                <select className="border border-black p-1" value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}>
                    <option value={"none"}>Wybierz przedmiot</option>
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
                <span className="text-xl">Ocena</span>
                <div className="flex gap-4">
                    {[1, 2, 3, 4, 5, 6].map((grade) => (
                        <Button key={grade} text={grade}  handleButton={() => {
                            setSelectedGrade(grade);
                        }}/>
                    ))}
                </div>
                <span className="text-xl">Wybrana ocena: {selectedGrade}</span>
                <Button text="Zapisz" handleButton={handleSave} disabled={selectedGrade === ""}/>
            </div>
        </div>
    )
}


function ChangePage(props) {
    const {currentStudent, currentStudentData, setCurrentStudentData, students, setStudents} = props;
    const subjects = Object.keys(currentStudentData);

    const handleKeyDown = (e, subject) => {
        const key = e.key;
        console.log(key);
        if (key === "Backspace") {
            setCurrentStudentData(prev => {
                const newData = {...prev};
                newData[subject] = newData[subject].slice(0, -1);
                return newData;
            })
        } else if (key >= "1" && key <= "6") {
            setCurrentStudentData(prev => {
                const newData = {...prev};
                newData[subject].push(parseInt(key));
                return newData;
            })
        }
    }

    const handleSave = () => {
        const updatedStudents = {...students};
        updatedStudents[currentStudent] = currentStudentData;
        setStudents(updatedStudents);
        
        updateStudents(updatedStudents)

        // localStorage.setItem("students", JSON.stringify(updatedStudents));
        window.alert("Oceny zostaly zapisane");
    }

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Zmiana ocen uzytkownika {currentStudent}</h1>
            <div className="flex flex-col gap-4">
                {subjects.map((subject) => (
                    <div key={subject} className="flex gap-4 items-center justify-between">
                        <span className="text-xl">{subject}</span>
                        <input type="text" className="border border-black p-1" value={currentStudentData[subject]}
                               onKeyDown={(e) => handleKeyDown(e, subject)}/>
                    </div>
                ))}
            </div>
            <Button text={"Zapisz"} handleButton={handleSave}/>
        </div>
    )
}
function DisplayPage(props) {
    const {currentStudent, currentStudentData} = props;
    const subjects = Object.keys(currentStudentData);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Oceny {currentStudent}</h1>
            <div className="flex flex-col gap-4">
                {subjects.map((subject) => (
                    <div key={subject} className="flex gap-4 items-center justify-between">
                        <span className="text-xl">{subject}</span>
                        <span className="text-xl">{currentStudentData[subject].join(", ")}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function App() {
    const [inputValue, setInputValue] = React.useState("");

    const [subjects, setSubjects] = React.useState(["Matematyka", "Fizyka", "Chemia"]);
    const [students, setStudents] = React.useState({
        "a": {"Matematyka": [5, 5], "Fizyka": [4, 1, 4, 6], "Chemia": [3]},
        "Jan Kowalski": {"Matematyka": [5], "Fizyka": [4, 6, 2], "Chemia": [3, 3]},
        "Jan Nowak": {"Matematyka": [2, 5]},
        "Adam Nowak": {"Fizyka": [4], "Chemia": [5]},
        "Krzysztof Kolumb": {},
    });
    const [currentStudent, setCurrentStudent] = React.useState("");
    const [currentStudentData, setCurrentStudentData] = React.useState({});
    const [page, setPage] = React.useState("menu");

    React.useEffect(() => {
        fetch("/api/students").then(res =>{
            if (res.ok){
                return res.json()
            }
            else {
                console.log("Error fetching students");
            }
        }).then(data => {
            console.log(data)
            setStudents(data)
        })


    }, []);


    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
    }


    const handleButton = (e, type) => {
        if (Object.keys(students).includes(inputValue)) {
            setCurrentStudent(inputValue);
            setCurrentStudentData(students[inputValue]);
            // setInputValue("");
            setPage(type);
        } else {
            window.alert("Student doesnt exists");
        }
    }

    return (
        <div className="border border-blue-500 p-4 flex flex-col gap-4">
            <Menu inputValue={inputValue}
                  handleChange={handleChange}
                  handleButton={handleButton}
                  students={Object.keys(students)}
            />
            {page === "display" && (
                <DisplayPage currentStudent={currentStudent}
                             currentStudentData={currentStudentData}
                />
            )}
            {page === "change" && (
                <ChangePage currentStudent={currentStudent}
                            currentStudentData={currentStudentData}
                            setCurrentStudentData={setCurrentStudentData}
                            subjects={subjects}
                            students={students}
                            setStudents={setStudents}
                />
            )}
            {page === "add" && (
                <AddPage currentStudent={currentStudent}
                         currentStudentData={currentStudentData}
                         setCurrentStudentData={setCurrentStudentData}
                         subjects={subjects}
                         students={students}
                         setStudents={setStudents}
                />
            )}
        </div>
    );
}

const container = document.getElementById('root'); // Retrieving references per container
const root = ReactDOMClient.createRoot(container); // Creating a React root for the given container
root.render(<App/>);
            `)

            response.end()
            break;

        case "GET /api/students":
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(students));
            response.end();
            break;

        case "POST /api/students/update":
            let body = "";
            request.on("data", chunk => {
                body += chunk.toString();
            });
            request.on("end", () => {
                try {
                    const updatedStudents = JSON.parse(body);

                    fs.writeFile("./server/data/students.json", JSON.stringify(updatedStudents, null, 2), (err) => {
                        if (err) {
                            console.error("Błąd zapisu pliku:", err);
                            response.writeHead(500, {"Content-Type": "application/json"});
                            response.write(JSON.stringify({error: "Błąd zapisu danych"}));
                            response.end();
                            return;
                        }

                        Object.assign(students, updatedStudents);
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.write(JSON.stringify({success: true}));
                        response.end();
                    });
                } catch (e) {
                    console.error(e);
                    response.writeHead(400, {"Content-Type": "application/json"});
                    response.write(JSON.stringify({error: "Nieprawidłowy format JSON"}));
                    response.end();
                }
            });;
            break;

        // end-point do dodania studenta ----------------------------------------------------------------
        case "POST /api/students/add":
            let bodyAdd = "";
            request.on("data", chunk => {
                bodyAdd += chunk.toString();
            });
            request.on("end", () => {
                try {
                    const newStudent = JSON.parse(bodyAdd);
                    const updatedStudents = {...students, ...newStudent};

                    fs.writeFile("./server/data/students.json", JSON.stringify(updatedStudents, null, 2), (err) => {
                        if (err) {
                            console.error("Błąd zapisu pliku:", err);
                            response.writeHead(500, {"Content-Type": "application/json"});
                            response.write(JSON.stringify({error: "Błąd zapisu danych"}));
                            response.end();
                            return;
                        }

                        Object.assign(students, updatedStudents);
                        response.writeHead(200, {"Content-Type": "application/json"});
                        response.write(JSON.stringify({success: true}));
                        response.end();
                    });
                } catch (e) {
                    console.error(e);
                    response.writeHead(400, {"Content-Type": "application/json"});
                    response.write(JSON.stringify({error: "Nieprawidłowy format JSON"}));
                    response.end();
                }
            });
            break;
        // end-point do dodania studenta ----------------------------------------------------------------

        default:
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found");
            response.end();
            break;

    }
}
if (!fs.existsSync("./server/data")) {
    fs.mkdirSync("./server/data");
}

if (!fs.existsSync("./server/data/students.json")) {
    const defaultStudents = {
        "Jan Kowalski": {"Matematyka": [5], "Fizyka": [4, 6, 2], "Chemia": [3, 3]},
        "Jan Nowak": {"Matematyka": [2, 5]},
        "Adam Nowak": {"Fizyka": [4], "Chemia": [5]},
        "Krzysztof Kolumb": {}
    };
    fs.writeFileSync("./server/data/students.json", JSON.stringify(defaultStudents, null, 2));
}

// Operacje synchroniczne, bo musimy mieć pewność, że plik istnieje przed uruchomieniem serwera
const students = JSON.parse(fs.readFileSync("./server/data/students.json", "utf-8"));

const server = http.createServer(requestListener);
server.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
    console.log("Press Ctrl+C to stop the server.");
})