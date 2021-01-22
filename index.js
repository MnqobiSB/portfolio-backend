const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.send('Welcome to my Portfolio');
});

app.post('/api/forma', (req, res) => {
	let data = req.body;
	let smtpTransport = nodemailer.createTransport({
		host: 'smtpout.secureserver.net',
		port: 465,
		secure: true,
		auth: {
			user: 'admin@suburbandigihustle.com',
			pass: process.env.EMAILPASS
		},
		tls: {
			rejectUnauthorized: false
		}
	});

	let mailOptions = {
		from: data.email,
		to: 'mnqobiwebdesign@gmail.com',
		subject: `Message from ${data.name} from Mnqobi's portfolio`,
		html: `
      <h1>Sender Information</h1>
      <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
      </ul>

      <h2>Message</h2>
      <p>${data.message}</p>
    `
	};

	smtpTransport.sendMail(mailOptions, (error, response) => {
		if (error) {
			res.send(error);
		} else {
			res.send('Success');
		}
	});

	smtpTransport.close();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log('Contact-form server running on port 3001');
});
