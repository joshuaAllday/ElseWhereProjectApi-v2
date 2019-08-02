const handleArticlefetch = (req,res,db) => {
	const { id } = req.params;
	db.select('*').from('articlepost').where({id})
	.then(article => {
		if (article.length){
			res.json(article[0])
		} else {
			res.status(400).json('Not found')
		}
	})
	.catch(err => res.status(400).json('error getting profile'))
}

module.exports = {
	handleArticlefetch: handleArticlefetch
}