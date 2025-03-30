function funkcja_zwrtona() {
    Array.from(document.forms[0].elements).forEach(el => {
        if (el.id === "pole_tekstowe")
            console.log("wczytanaWartoscZPolaTekstowego:" + typeof el.value)
        else if (el.id === "pole_liczbowe")
            console.log("wczytanaWartośćZPolaNumerycznego:" + typeof el.value)
    })
}
funkcja_zwrtona()