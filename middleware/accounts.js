const accounts = require("../accounts/acountsDb");

function validateAccountId() {
    return async (req, res, next) => {
        req.account = await accounts.getById(req.params.id);
        if(!req.account){
            throw({err: '404'});
            //res.status(404).json({ message: "invalid account id" });
        }
            next();
    }

}

module.exports = {
    validateAccountId
    
}