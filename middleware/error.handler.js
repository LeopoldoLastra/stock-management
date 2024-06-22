function logError(err,req,res,next){
    console.log(err)
    next(err)
}

function errorHandler(err,req,res,next){
    res.json({
        message:err.message,
        stack: err.stack
    })
}

function boomErrorHandler(err,req,res,next){
    if(err.isboom){
        const {output}=err;
        res.status(output.statusCode).json(output.payload)
    }else{
        next(err)
    }
}

module.exports={logError, errorHandler,boomErrorHandler}