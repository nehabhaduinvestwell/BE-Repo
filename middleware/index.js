const verifyToken = async (req,res,next) =>{
    const token= req.cookies.token;
    console.log("middlewaretoken", token);
    if(typeof token !== "undefined") {
        req.token = token;
        next();
    }else{
        return res.send({
            succes: false,
            message: "invalid token",
            result: {}
        });
    }
}

module.exports = {verifyToken}