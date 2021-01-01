class index {
    index(req, res){
        res.send("This is page default for controller default module clean-arch")
    }

    test(req, res){
        res.send("This is page testing for controller default module clean-arch")
    }
}

module.exports = index