const myLogger = (req,res,next) => {
    console.log(`kamu masuk ${req.url} ${req.method} --- ${new Date()}`)
    next();
}

module.exports = myLogger;