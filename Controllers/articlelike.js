handleArticlelike = (req,res,db) =>{
	const { id } = req.body;
	db('version2').where('id', '=', id)
	.increment('likes', 1)
	.returning('likes')
	.then(likes => {
		res.json(likes[0]);
	})
	.catch(err => res.status(400).json('unable to get likes'))
}

module.exports = {
	handleArticlelike: handleArticlelike
}