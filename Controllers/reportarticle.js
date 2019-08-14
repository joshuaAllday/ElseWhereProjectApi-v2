const handleReportarticle = (req,res, nodemailer) => {
	const { id, firstname, lastname, articletitle} = req.body;
	if (!id || !firstname || !lastname || !articletitle ){
		return res.status(400).json('incorrect form submission');
	}
	const output = `
		<p> Reported Article </p>
		<ul>
			<li> id: ${id} </li>
			<li> name: ${firstname} ${lastname} </li>
			<li> articletitle: ${articletitle} </li>
		</ul>
	`;
	let transporter = nodemailer.createTransport({
	 service: 'gmail',
	 auth: {
	        user: process.env.EMAIL_ADDRESS,
	        pass: process.env.EMAIL_PASSWORD
	    }
	});

	let mailOptions ={
		from: process.env.EMAIL_ADDRESS,
		to: process.env.EMAIL_ADDRESS2,
		subject: 'REPORTED ARTICLE ',
		text: 'Reported Article',
		html: output
	};

	transporter.sendMail(mailOptions, function(error,info){
		if (error){
			res.status(400).json('Error reporting article')
		}
		res.send({success: true})
	})
}

module.exports = {
	handleReportarticle: handleReportarticle
}