//takze tady se meni jazyky stranky

//zjistime jazyk brauzeru
const userlang = navigator.language || navigator.userLanguage;
if (userlang.startsWith('cs')) {
    var lang = 'cs';
} else {
    var lang = 'en';
}

//tady se to loadne z /lang/xx.lang
//a pak se to aplikuje na vsechny elementy s langId="id"
(async () => {
    const langraw = await fetch(`/lang/${lang}.lang`)
    const langtext = await langraw.text();
    const langlines = langtext.split('\n');
    for (const line of langlines) {
        if (line.startsWith('##') || line.trim() === '') continue;
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=').trim();
        document.querySelectorAll(`[langId="${key.trim()}"]`).forEach(el => {
            el.innerHTML = value;
        });
    }
})();