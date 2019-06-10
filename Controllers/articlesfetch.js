const handleArticlesfetch = (req,res,db) => {
	db.select('id',
			  'firstname',
			  'lastname',
			  'latitude',
			  'longitude',
			  'articletitle',
			  'tag',
			  'article'
	).from('version2')
	.then(article => {
		res.json(article);
	})
}

module.exports = {
	handleArticlesfetch: handleArticlesfetch
}