const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (db, bcrypt, req, res)=> {
	const { username, password } = req.body;
	if (!username || !password){
		return Promise.reject('incorrect form submission');
	}
	return db.select('username', 'hash').from('login')
		.where('username', '=', username )
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid){
				return db.select('*').from('login')
					.where('username', '=', username)
					.then(user => user[0])
					.catch(err => Promise.reject('unable to get user'))
			}else{
				Promise.reject('wrong credentials')
			}
		})
		.catch(err => Promise.reject('wrong credentials'))
}
const getAuthTokenId = (req,res) => {
	const { authorization } = req.headers;
	return redisClient.get(authorization, (err, reply) => {
		if (err || !reply){
			return res.status(400).json('Unauthorized')
		}
		return res.json({id: reply})
	})
};

const signToken = (username) => {
	const jwtPayload = { username };
	return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2days' });
	// want to make an environment variable here
};

const setToken = (key, value) => {
	return Promise.resolve(redisClient.set(key, value))
}

const createSession = (data) => {
	const {  username, id } = data;
	const token = signToken(username);
	return setToken(token, id)
		.then(() => { 
			return { success: 'true', userId: id, token } 
		})
		.catch(console.log)
};

const signinAuthentication = (db, bcrypt, req,res) => {
	const { authorization } = req.headers;
	return authorization ? 
		getAuthTokenId(req,res) : 
		handleSignin(db, bcrypt, req, res)
			.then(data => {
				return data.username && data.id ? createSession(data) : Promise.reject(data)
			})
			.then(session => res.json(session))
			.catch(err => res.status(400).json(err))
};

module.exports = {
	signinAuthentication: signinAuthentication,
	redisClient: redisClient
};