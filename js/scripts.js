// POKUD SE ZDE VRTÁTE V KÓDU, POZOR MŮŽETE DOSTAT BOLEST HLAVY
// komentare jsou tu pro vrtalky


//tady jsou vsechny texty pro varovani pred scamem a phishing
const contents = [
    'Scam je podvodná činnost, která má za cíl oklamat oběť a získat od ní peníze nebo citlivé informace.',
    'Phishing je technika, při které útočník předstírá, že je důvěryhodná osoba nebo instituce, aby získal citlivé informace, jako jsou hesla nebo čísla kreditních karet.',
    'Jak se phisingu vyhnout? <br> - Vždy si kontrolujte URL, odkud e-mail nebo zpráva pochází.<br> - Nikdy neklikejte na podezřelé odkazy nebo přílohy.<br> - Používejte dvoufaktorovou autentizaci, pokud je to možné. <br> - Nikdy nesdílejte své osobní údaje nebo finanční informace s neznámými osobami nebo na nedůvěryhodných webových stránkách.',
    'Pokud máte podezření, že jste se stali obětí scamu nebo phishingu, okamžitě kontaktujte svou banku a změňte svá hesla.',
    'Děkujeme, že jste navštívili ScamStránka.CZ. Buďte opatrní a chraňte své osobní údaje!'
];

function nextPage() {
    const scamExplain = document.querySelector('.scamExplain');
    scamExplain.innerHTML = contents.shift() || contents[contents.length - 1]; //tohle smaze prvni polozku v arrayi a returnne dalsi
    if (contents.length === 0) {
        const nextBtn = document.querySelector('.next');
        nextBtn.innerHTML = '<i class="hgi hgi-stroke hgi-contact-01"></i> Kontakt'; // kontaktni tlacitko
        nextBtn.setAttribute('href', 'javascript:contact()'); // tady se nastavi aby to votevrelo formular
        nextBtn.setAttribute('langId', 'contactBtn');

        const restart = document.createElement('a');//tady je projit si to znovu
        restart.className = 'next'; //classa
        restart.style.marginLeft = '10px'; //margin
        restart.innerHTML = '<i class="hgi hgi-stroke hgi-reload"></i> Projít si to znovu'; //text
        restart.setAttribute('href', 'javascript:location.reload()');//aby se to proslo zpatky
        restart.setAttribute('langId', 'restartBtn')
        document.body.appendChild(restart);//pridani do body
        reloadLang(lang);
    }
}

//tady zaciina bolest hlavy

function contact() {
    const scamExplain = document.querySelector('.scamExplain'); //getnes element
    document.querySelectorAll('.next')[0].style.display = 'none'; //skryjes tlacitko
    //strasne shit zpusob elementu V
    const formular = '<form action id="kotaktn"><label for="name" langId="formName">Jméno:</label><br><input type="text" id="name" name="name" required><br><label for="email" langId="formEmail">E-mail:</label><br><input type="email" id="email" name="email" required><br><label for="message" langId="formMsg">Zpráva:</label><br><textarea id="message" name="message" rows="4" required></textarea><br><input type="submit" value="Odeslat" class="next" langId="formSend"></form>';
    //tady se dava text kontaktu
    scamExplain.innerHTML = 'Pokud máte jakékoli dotazy nebo potřebujete pomoc, neváhejte mne kontaktovat na <a href="mailto:mrtomicz@frdomains.eu">mrtomicz@frdomains.eu</a>, <a href="mailto:webmaster@scamstranka.cz">webmaster@scamstranka.cz</a>. Rád vám pomůžu!<br>Také můžete použít formulář níže:<br>';
    scamExplain.setAttribute('langId', 'contact')
    reloadLang(lang);
    scamExplain.innerHTML = scamExplain + formular;
    const form = document.getElementById('kotaktn'); //getnuti formulare
    form.addEventListener('submit', async function(event) {//toto je kdyz das odeslat
        event.preventDefault();//vyser se na normalni odeslani a pouzij tohle
        scamExplain.innerHTML = 'Odesílám...';
        const IPresponse = await fetch('https://api.ipify.org?format=json'); //ip logger pro zlobiky
        const IPdata = await IPresponse.json();//prevedeni na json
        const userIP = IPdata.ip;//tady nevim proste to je ip
        //tady se to odesila na server
        fetch('/api/sendmail', {
            method: 'POST',
            body: JSON.stringify({//json.stringify protoze to musi bejt string
                name: form.name.value,//jmeno
                email: form.email.value,//ymejl
                message: form.message.value,//zprava
                ip: userIP
            }),
            headers: { "Content-Type": "application/json" }//jinak na nas server sere a hazi error
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            //tady se chyta chyba V
            if (data.error) return scamExplain.innerHTML = 'CHYBA: ' + data.error + "<br>Detaily: <br>" + data.details || 'Žádné detaily';
            //tady se vypise ze to doslo nebo ze jsem hluboce v prdeli
            scamExplain.innerHTML = data.message || 'Něco je hodně špatně, použijte prosím e-mail.';
        }).catch((error) => {
            scamExplain.innerHTML = "CHYBA: "+error;//dalsi chyba
        });
        form.reset();//vymazani formulare i kdyz uz jsme ho vymazali uplne (misto toho odesilam nebo odeslano)
    });
}