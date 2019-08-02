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
	})
}

module.exports = {
	handleArticlesfetch: handleArticlesfetch
}