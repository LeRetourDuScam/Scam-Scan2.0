// controllers/contactController.js
const nodemailer = require('nodemailer');

// Configurer le transporteur Nodemailer (exemple avec Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Assurez-vous d'utiliser des variables d'environnement pour plus de sécurité
        pass: process.env.EMAIL_PASS
    }
});

// Envoyer un e-mail de contact
exports.sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // L'email de l'utilisateur
        to: 'Daniel.MelroSerdoura@metalor.com', // Adresse de réception
        subject: `Nouveau message de contact de ${name}`,
        text: `
            Nom: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Message envoyé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi de l'email", error: error.message });
    }
};
