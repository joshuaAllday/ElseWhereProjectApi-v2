const handleArticlesfetch = (req,res,db) => {
	db.select('id',
			  'firstname',
			  'lastname',
			  'latitude',
			  'longitude',
			  'articletitle',
			  'tag',
			  'article'
	).from('articlepost')
	.then(article => {
		res.json(article);
	}).catch(err => res.status(400).json('error getting profile'))
}

module.exports = {
	handleArticlesfetch: handleArticlesfetch
}