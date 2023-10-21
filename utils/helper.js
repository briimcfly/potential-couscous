//Success Handler
function success(res, msg, pyld, code) {
    console.log(msg);
    res.status(code).json(pyld);
}

//Error Handler 
function error(res, msg, err, code) {
    if (err) {
        console.log(msg, err);
    } else {
        console.log(msg);
    }
    res.status(code).json({message: msg});
}

module.exports = {error, success};