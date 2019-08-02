const handleArticleedit = (req,res,db) => {
	const { id, firstname, lastname, articletitle, tag, article, longitude, latitude} = req.body;
	db('articlepost').where('id', '=', id)
	.update({
		articletitle: articletitle,
		firstname: firstname,
		lastname: lastname,
		tag: tag,
		article: article,
		latitude: latitude,
		longitude: longitude
	})
	.returning('*')
	.then(article => {
		res.json(article[0])
	})
	.catch(err => res.status(400).json('unable to find id'))
}

module.exports = {
	handleArticleedit: handleArticleedit
}