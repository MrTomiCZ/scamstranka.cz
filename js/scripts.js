// POKUD SE ZDE VRTÁTE V KÓDU, POZOR MŮŽETE DOSTAT BOLEST HLAVY

const contents = [
    'Tato stránka slouží k vysvětlení pojmů jako scam, phishing, a podobně. Cílem je informovat uživatele o rizicích spojených s těmito praktikami a jak se jim vyhnout.',
    'Scam je podvodná činnost, která má za cíl oklamat oběť a získat od ní peníze nebo citlivé informace.',
    'Phishing je technika, při které útočník předstírá, že je důvěryhodná osoba nebo instituce, aby získal citlivé informace, jako jsou hesla nebo čísla kreditních karet.',
    'Nikdy nesdílejte své osobní údaje nebo finanční informace s neznámými osobami nebo na nedůvěryhodných webových stránkách.',
    'Pokud máte podezření, že jste se stali obětí scamu nebo phishingu, okamžitě kontaktujte svou banku a změňte svá hesla.',
    'Děkujeme, že jste navštívili ScamStránka.CZ. Buďte opatrní a chraňte své osobní údaje!'
];

function nextPage() {
    const scamExplain = document.querySelector('.scamExplain');
    scamExplain.innerHTML = contents.shift() || '<a href="javascript:contact()">Kontakt</a>';
    if (contents.length === 0) {
        document.querySelector('.next').style.display = 'none';
    }
}

function contact() {
    window.location.href = '/kontakt';
}