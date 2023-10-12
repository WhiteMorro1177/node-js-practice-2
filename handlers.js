const invalidPathHandler = (req, res, next) => {
    res.redirect("/");
    next();
};

module.exports = {
    invalidPathHandler
}