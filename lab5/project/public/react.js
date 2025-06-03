
import React from "https://esm.sh/react/?dev";
import ReactDOMClient from "https://esm.sh/react-dom/client/?dev";

const updateStudents = (students) => {
    fetch("/api/students/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ students }), // opakowane w obiekt
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
        });
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
            