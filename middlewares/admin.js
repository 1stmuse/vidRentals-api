module.exports = function(req,res,nest){
    if(!req.user.isAdmin) return res.status(403).send('Access denied')

    nest()
}