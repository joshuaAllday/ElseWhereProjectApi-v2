const handleArticlepost = (req,res, db) => {
	const { firstname, lastname, email, latitude, longitude, articletitle, tag, article } = req.body;
	if (!firstname || !lastname || !email || !latitude || !longitude || !tag || !articletitle || !article){
		return res.status(400).json('incorrect form submission');
	}
	db('articlepost').insert({
		firstname: firstname,
		lastname: lastname,
		email: email, 
		latitude: latitude,
		longitude: longitude,
		articletitle: articletitle,
		tag: tag,
		article: article,
		posted: new Date(),
	})
	.returning("*")
	.then(article => {
		console.log(article)
		res.json({success: true, article: article[0]})
	})
	.catch(err => res.status(400).json('error posting article'))
};

module.exports = {
	handleArticlepost: handleArticlepost
}