
const handleRegister = (req,res, db, bcrypt) => {
	const { username, password } = req.body;
	const hash = bcrypt.hashSync(password);
	db('login').insert({
			hash:hash,
			username: username
		})
		.returning('*')
		.then(
			res.send("success")
		)
}

module.exports = {
	handleRegister: handleRegister
}