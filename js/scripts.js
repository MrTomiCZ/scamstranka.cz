// POKUD SE ZDE VRTÁTE V KÓDU, POZOR MŮŽETE DOSTAT BOLEST HLAVY

const contents = [
    'Scam je podvodná činnost, která má za cíl oklamat oběť a získat od ní peníze nebo citlivé informace.',
    'Phishing je technika, při které útočník předstírá, že je důvěryhodná osoba nebo instituce, aby získal citlivé informace, jako jsou hesla nebo čísla kreditních karet.',
    'Nikdy nesdílejte své osobní údaje nebo finanční informace s neznámými osobami nebo na nedůvěryhodných webových stránkách.',
    'Pokud máte podezření, že jste se stali obětí scamu nebo phishingu, okamžitě kontaktujte svou banku a změňte svá hesla.',
    'Děkujeme, že jste navštívili ScamStránka.CZ. Buďte opatrní a chraňte své osobní údaje!'
];

function nextPage() {
    const scamExplain = document.querySelector('.scamExplain');
    scamExplain.innerHTML = contents.shift() || contents[contents.length - 1];
    if (contents.length === 0) {
        document.querySelector('.next').innerHTML = '<i class="hgi hgi-stroke hgi-contact-01"></i> Kontakt';
        document.querySelector('.next').setAttribute('href', 'javascript:contact()');
        const restart = document.createElement('a');
        restart.className = 'next';
        restart.style.marginLeft = '10px';
        restart.innerHTML = '<i class="hgi hgi-stroke hgi-reload"></i> Projít si to znovu';
        restart.setAttribute('href', 'javascript:location.reload()');
        document.body.appendChild(restart);
    }
}

function contact() {
    const scamExplain = document.querySelector('.scamExplain');
    scamExplain.innerHTML = 'Pokud máte jakékoli dotazy nebo potřebujete pomoc, neváhejte mne kontaktovat na <a href="mailto:mrtomicz@frdomains.eu">mrtomicz@frdomains.eu</a>. Rád vám pomůžu!';
    document.querySelectorAll('.next')[0].style.display = 'none';
}