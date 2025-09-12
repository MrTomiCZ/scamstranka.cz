//takze tady se meni jazyky stranky

//tady tohle je tu protoze nechcem nacitat cestinu, ta uz je hotova v HTML strukture
let loadLang = true;

//zjistime jazyk brauzeru
const userlang = navigator.language || navigator.userLanguage;
if (userlang.startsWith('cs')) {//cestina🇨🇿🇨🇿🇨🇿🇨🇿🇨🇿🇨🇿🍺🍺
    loadLang = false;
    var lang = 'cs';
    //tady se to teda vyplo nacitani CZ
} else {//pokud to neni vyse zde definovane serem na to a davame ingliš
    var lang = 'en';
}

//tady se to loadne z /lang/xx.lang
//a pak se to aplikuje na vsechny elementy s langId="id"
//UPRAVENO::: tady se jen definuje funkce
async function reloadLang(lang, element) {
    if (!loadLang) return; //tady serem na to pokud nechcem nacitat
    document.getElementById("langSwitcher").value = lang;
    const langraw = await fetch(`/lang/${lang}.lang`)//nacti jazyk
    const langtext = await langraw.text();//precti ho
    const langlines = langtext.split('\n');//naformatovat po radkach
    for (const line of langlines) {//procesujeme jazyk
        if (line.startsWith('##') || line.trim() === '') continue;//komentar
        const [key, ...valueParts] = line.split('=');//tu uz se  nacitaji
        const value = valueParts.join('=').trim();//kdyby byly mezerniky navic jdou pryc
        if (element) {
            element.querySelectorAll(`[langId="${key.trim()}"]`).forEach(el => {//tady se to ulozi / ukaze / renderne
                if (typeof el.value !== "undefined") {
                    el.value = value;
                } else {
                    el.innerHTML = value;
                }
            });
        } else {
            document.querySelectorAll(`[langId="${key.trim()}"]`).forEach(el => {//tady se to ulozi / ukaze / renderne
                el.innerHTML = value;
            });
        }
    }
};

(async () => {
    const search = new URLSearchParams(window.location.search);
    if (search.loadlang === "false") {}
    else reloadLang(lang);
    const switcher = document.createElement("select");
    switcher.classList.add('langloader');
    const en = document.createElement("option");
    en.value = "en";
    en.innerText = "🇺🇸 English"
    switcher.appendChild(en);
    const cz = document.createElement("option");
    cz.value = "cs";
    cz.innerText = "🇨🇿 Čeština"
    switcher.appendChild(cz);

    const select = document.createElement("option");
    select.value = 'en';
    select.innerText = '🌍 Language/Jazyk'

    switcher.onchange((e) => {
        reloadLang(switcher.value);
    });

    switcher.id = "langSwitcher";
    document.body.appendChild(switcher);
})();