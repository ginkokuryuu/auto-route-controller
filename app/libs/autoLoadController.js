const path = require('path');
const fs = require('fs');

class autoLoadController {
    modulePath = 'app/modules'
    allController = []

    constructor(fPath) {
        this.autoLoad(fPath)
    }

    autoLoad(fPath = this.modulePath, isModuleDir = false, moduleName = "") {
        fs.readdirSync(fPath).forEach(file => {
            var filePath = path.join(fPath, file)
            var stat = fs.statSync(filePath)
            if (stat.isDirectory()) {
                if (!isModuleDir) {
                    console.log(`loading module ${file}`)
                    this.autoLoad(filePath, true, file)
                }
                else if (isModuleDir) {
                    if (file == "controllers") {
                        this.loadController(filePath, moduleName)
                    }
                    else{
                        this.autoLoad(filePath, true, moduleName)
                    }
                }
            }
        })
    }

    loadController(fPath, moduleName){
        fs.readdirSync(fPath).forEach(file => {
            var filePath = path.join(fPath, file)
            const requireFilePath = path.resolve(filePath)
            console.log(`loaded controller ${file} of module ${moduleName} in ${requireFilePath}`)
            this.assignControllerFunction(moduleName, file, requireFilePath)
        })
    }

    assignControllerFunction(moduleName, theController, requireFilePath) {
        var theClass = require(requireFilePath)
        var theObject = new theClass()

        let props = []

        do {
            const methods = Object.getOwnPropertyNames(theObject)
                .concat(Object.getOwnPropertySymbols(theObject).map(s => s.toString()))
                .sort()
                .filter((p, i, arr) =>
                    typeof theObject[p] === 'function' &&
                    p !== 'constructor'
                )
            props = props.concat(methods)
        }
        while (
            (theObject = Object.getPrototypeOf(theObject)) &&
            Object.getPrototypeOf(theObject)
        )

        var newObject = new theClass()
        for(let i = 0; i < props.length; i++){
            this.allController.push({module: moduleName, controller: theController.replace('.js', ''), actionName: props[i], action: newObject[props[i]]})
        }
    }

    callController(module, controller, action, req, res) {
        var objFound = this.allController.find(obj => obj.module === module && obj.controller === controller && obj.actionName === action)
        if(objFound)
            objFound.action(req, res)
        else{
            res.send("404 Page Not found")
        }
    }
}

module.exports = autoLoadController