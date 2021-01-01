class about {
    index(req, res){
        res.send("This is page default for controller about module dashboard")
    }

    test(req, res){
        res.send("This is page testing for controller about module dashboard")
    }
}

module.exports = about