const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'chaimaelebdaoui@gmail.com', // Your Gmail address
                pass: 'Chaimae941937',   // Your Gmail app password (not regular password)
            },
        });

        const mailOptions = {
            from: email, // Sender's email address
            to: 'chaimaelebdaoui@gmail.com', // Receiver's email address
            subject: 'New Message from Contact Us Form',
            text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ status: 'fail', message: 'Something went wrong' });
            }
            return res.status(200).json({ status: 'success', message: 'Message sent successfully' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'fail', message: 'Error while sending email' });
    }
};

module.exports = sendEmail;
