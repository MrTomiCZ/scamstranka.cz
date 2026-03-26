import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    //get delete patch atd
    if (req.method !== 'POST') {
        res.status(200).json({ error: '405 Nepovolena metoda' });
        return;
    }

    //si ziskame body
    const { name, email, message } = req.body;

    //nejsou body veci
    if (!name || !email || !message) {
        res.status(200).json({ error: '400 Chybi potrebne moznosti' });
        return;
    }

    // credentials
    const transporter = nodemailer.createTransport({
        host: 'smtp.seznam.cz',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SEZNAM_USER, // seznam.cz ýmejl
            pass: process.env.SEZNAM_PASS, // seznam.cz heslo :3
        },
    });

    try {
        //vodeslat
        await transporter.sendMail({
            from: "SCAMSTRANKA MAILER <"+process.env.SEZNAM_USER+">",
            to: 'scamstranka@mrtomicz.eu kontakt@scamstranka.cz',
            subject: "[KONTAKT FORM] Nová zpráva > " + name,
            html: "Jméno: <strong>" + name + "</strong><br>Email: <strong><a href="+`"${email}">` + email + "</a></strong><br>Zpráva: <strong>" + message + "</strong><br>IP Adresa: <strong>" + (req.body.ip || 'N/A') + "</strong>",
        });
        //potvrdime uzivateli
        res.status(200).json({ message: '200 Odeslano v poradku' });
    } catch (error) {
        //neco pokazilo sa
        res.status(200).json({ error: '500 Nelze odeslat email', details: error.message });
    }
}
