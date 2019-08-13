const handleDelete = (req,res,db) => {
    const { id } = req.body;
    db('articlepost').where('id', '=', id)
    .del()
    .then(data => {
        if(data === 1){
            res.send({success:true})
        } else {
            res.status(400).json('already deleted')
        }
    })
    .catch(err => res.status(400).json('unable to find it '))
};

module.exports = {
	handleDelete: handleDelete
}