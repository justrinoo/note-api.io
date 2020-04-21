const auth = (req,res,next) => {
    if(req.headers.auth !== 'rino'){
        res.statusCode = 401;
        res.json({message: 'REQUEST DENIED!'})
    }
    next();
}

module.exports = auth;