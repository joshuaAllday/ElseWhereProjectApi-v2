
const handleRegister = (req,res, db, bcrypt) => {
	const { username, password } = req.body;
	const hash = bcrypt.hashSync(password);
	db('login').insert({
			hash:hash,
			username: username
		})
		.returning('username')
		.then(res.send({success:'true'}))
		.catch(error => res.send(error.message))
};

module.exports = {
	handleRegister: handleRegister
}