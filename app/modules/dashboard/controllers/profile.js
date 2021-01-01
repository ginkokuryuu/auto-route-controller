class profile {
    index(req, res){
        res.send("This is page default for controller profile module dashboard")
    }

    habib(req, res){
        res.send("This is page habib for controller profile module dashboard")
    }
}

module.exports = profile