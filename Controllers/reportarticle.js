const handleReportarticle = (req,res, nodemailer) => {
	const { id, name, title, email, comment} = req.body;
	if (!id || !name || !title || !email || !comment){
		return res.status(400).json('incorrect form submission');
	}
	const output = `
		<p> Reported Article </p>
		<ul>
			<li> id: ${id} </li>
			<li> name: ${name} </li>
			<li> articletitle: ${title} </li>
			<li> name: ${email} </li>
		</ul>
		<p> Comment: ${comment}</p>
	`;
	let transporter = nodemailer.createTransport({
	 service: 'gmail',
	 auth: {
	        user: 'ja15931@my.bristol.ac.uk',
	        pass: 'JATaiga123!'
	    }
	});

	let mailOptions ={
		from: 'ja15931@gmail.com',
		to: 'joshallday@icloud.com',
		subject: 'test number 1 ',
		text: 'Reported Article',
		html: output
	};

	transporter.sendMail(mailOptions, function(error,info){
		if (error){
			res.json("error");
		} else {
			console.log('Email sent:' + info);
		}
		res.json("posted")
	})
}

module.exports = {
	handleReportarticle: handleReportarticle
}