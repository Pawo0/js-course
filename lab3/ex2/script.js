const setBtn = document.querySelector("#set");
const deleteBtn = document.querySelector("#delete");
const addBtn = document.querySelector("#add");

const aside = document.querySelector("aside");
const footer = document.querySelector("footer");
const header = document.querySelector("header");
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const container = document.querySelector("#container");
const leftSide = document.querySelector("#left-side");
const blockquote =document.querySelector("blockquote");


const blocks = document.querySelectorAll(".block");
const azures = document.querySelectorAll(".azure");




setBtn.addEventListener('click', () => {
    const asideStyles = {
        marginTop: "25px",
        flex: "1",
        padding: "10px",
        height: "220px"
    }
    const footerStyles = {
        margin: "25px auto",
        padding: "10px"
    }
    const headerStyles = {
        padding: "0 5px"
    }
    const mainStyles = {
        marginTop: "25px",
        padding: "10px"
    }
    const navStyles = {
        border: "1px solid black",
        boxShadow: "1px 1px 5px black",
        marginTop: "25px",
        padding: "5px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "150px"
    }
    const containerStyles = {
        display: "flex",
        justifyContent: "space-between",
        gap: "10%"
    }
    const blockStyles = {
        border: "1px solid #A8A8A8",
        boxShadow: "0 0 8px black"
    }
    const azureStyles = {
        backgroundColor: "#b6fafa"
    }
    const leftSideStyles = {
        flex: "1",
        display: "flex",
        flexDirection: "column"
    }
    const blockquoteStyles = {
        margin: "0"
    }


    Object.assign(aside.style, asideStyles);
    Object.assign(footer.style, footerStyles);
    Object.assign(header.style, headerStyles);
    Object.assign(main.style, mainStyles);
    Object.assign(nav.style, navStyles);
    Object.assign(container.style, containerStyles);
    Object.assign(leftSide.style, leftSideStyles);
    Object.assign(blockquote.style, blockquoteStyles);

    blocks.forEach(block => {
        Object.assign(block.style, blockStyles);
    });

    azures.forEach(azure => {
        Object.assign(azure.style, azureStyles);
    });


})

deleteBtn.addEventListener('click', () => {
    aside.removeAttribute("style");
    footer.removeAttribute("style");
    header.removeAttribute("style");
    main.removeAttribute("style");
    nav.removeAttribute("style");
    container.removeAttribute("style");
    leftSide.removeAttribute("style");
    blockquote.removeAttribute("style");

    blocks.forEach(block => {
        block.removeAttribute("style");
    });

    azures.forEach(azure => {
        azure.removeAttribute("style");
    });
})
// Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi, cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki, wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę muzykę i podwaja echem. Umilkli strzelcy, stali szczwacze zadziwieni Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt, którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w nie wpuścił i rozpoczął łowy. Bo w graniu była łowów historyja krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak grzmot: to strzelanie.

const wojski = [
    "Natenczas Wojski chwycił na taśmie przypięty",
    "Swój róg bawoli, długi, cętkowany, kręty ",
    "Jak wąż boa, oburącz do ust go przycisnął, ",
    "Wzdął policzki jak banię, w oczach krwią zabłysnął, ",
    "Zasunął wpół powieki, wciągnął w głąb pół brzucha ",
    "I do płuc wysłał z niego cały zapas ducha, ",
    "I zagrał: róg jak wicher, wirowatym dechem ",
    "Niesie w puszczę muzykę i podwaja echem. ",
    "Umilkli strzelcy, stali szczwacze zadziwieni ",
    "Mocą, czystością, dziwną harmoniją pieni. ",
    "Starzec cały kunszt, którym niegdyś w lasach słynął, ",
    "Jeszcze raz przed uszami myśliwców rozwinął; ",
    "Napełnił wnet, ożywił knieje i dąbrowy, ",
    "Jakby psiarnię w nie wpuścił i rozpoczął łowy. ",
    "Bo w graniu była łowów historyja krótka: ",
    "Zrazu odzew dźwięczący, rześki: to pobudka; ",
    "Potem jęki po jękach skomlą: to psów granie; ",
    "A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."

]
let wojskiIterator = 0;

addBtn.addEventListener('click', () => {
    if (wojskiIterator >= wojski.length) {
        addBtn.setAttribute("disabled", "true");
    } else{
        const paragraph = document.createElement("p");
        paragraph.textContent = wojski[wojskiIterator];
        blockquote.appendChild(paragraph)
        wojskiIterator++;
        if (wojskiIterator >= wojski.length) {
            addBtn.setAttribute("disabled", "true");
        }
    }
})
