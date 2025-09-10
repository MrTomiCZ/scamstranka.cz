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
async function reloadLang(lang) {
    if (!loadLang) return; //tady serem na to pokud nechcem nacitat
    const langraw = await fetch(`/lang/${lang}.lang`)//nacti jazyk
    const langtext = await langraw.text();//precti ho
    const langlines = langtext.split('\n');//naformatovat po radkach
    for (const line of langlines) {//procesujeme jazyk
        if (line.startsWith('##') || line.trim() === '') continue;//komentar
        const [key, ...valueParts] = line.split('=');//tu uz se  nacitaji
        const value = valueParts.join('=').trim();//kdyby byly mezerniky navic jdou pryc
        document.querySelectorAll(`[langId="${key.trim()}"]`).forEach(el => {//tady se to ulozi / ukaze / renderne
            el.innerHTML = value;
        });
    }
};

(async () => {
    reloadLang();
})();