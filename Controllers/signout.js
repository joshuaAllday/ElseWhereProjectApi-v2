const redisClient = require('./signin').redisClient;

const signOutAuthentication = (req,res) => {    
    const { authorization } = req.headers;
	return redisClient.del(authorization, (err, reply) => {
		if (err || !reply){
			return res.status(400).json('Unauthorized')
		}
		return res.json({response: reply, success: 'true'})
	}); 
};

module.exports = {
	signOutAuthentication: signOutAuthentication
};
