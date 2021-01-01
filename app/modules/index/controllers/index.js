class index {
    index(req, res){
        res.send("This is page default for controller default module default")
    }

    test(req, res){
        res.send("This is page testing for controller default module default")
    }
}

module.exports = index