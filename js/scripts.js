// POKUD SE ZDE VRTÁTE V KÓDU, POZOR MŮŽETE DOSTAT BOLEST HLAVY

const contents = [
    'Scam je podvodná činnost, která má za cíl oklamat oběť a získat od ní peníze nebo citlivé informace.',
    'Phishing je technika, při které útočník předstírá, že je důvěryhodná osoba nebo instituce, aby získal citlivé informace, jako jsou hesla nebo čísla kreditních karet.',
    'Jak se phisingu vyhnout? <br> - Vždy si kontrolujte URL, odkud e-mail nebo zpráva pochází.<br> - Nikdy neklikejte na podezřelé odkazy nebo přílohy.<br> - Používejte dvoufaktorovou autentizaci, pokud je to možné. <br> - Nikdy nesdílejte své osobní údaje nebo finanční informace s neznámými osobami nebo na nedůvěryhodných webových stránkách.',
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
    const formular = '<form action id="kotaktn"><label for="name">Jméno:</label><br><input type="text" id="name" name="name" required><br><label for="email">E-mail:</label><br><input type="email" id="email" name="email" required><br><label for="message">Zpráva:</label><br><textarea id="message" name="message" rows="4" required></textarea><br><input type="submit" value="Odeslat"></form>';
    scamExplain.innerHTML = 'Pokud máte jakékoli dotazy nebo potřebujete pomoc, neváhejte mne kontaktovat na <a href="mailto:mrtomicz@frdomains.eu">mrtomicz@frdomains.eu</a>, <a href="mailto:webmaster@scamstranka.cz">webmaster@scamstranka.cz</a>. Rád vám pomůžu!<br>Také můžete použít formulář níže:<br>'+formular;
    document.querySelectorAll('.next')[0].style.display = 'none';
    const form = document.getElementById('kotaktn');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        fetch('/api/sendmail', {
            method: 'POST',
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            }),
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            if (data.error) return alert('CHYBA: ' + data.error + "\nDetaily: \n" + data.details || 'Žádné detaily');
            alert(data.message || 'Něco je hodně špatně, použijte prosím e-mail.');
        }).catch((error) => {
            alert('CHYBA:' + error);
        });
        form.reset();
    });
}