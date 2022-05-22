const axios = require('axios')
const fs = require('fs')
const loadbalancer = require('../util/loadbalancer')
const registry = require('../config/registry.json')
const path = require('path');

/**
 * Enable/Disable microservice instances.
 * Only admins have the authority to call this function
 * 
 * @param {json} req
 * @param {json} res
 * @return {json} result of process
 */
const handleServerEnable = async (req, res) => {
    const apiName = req.params.apiName
    const requestBody = req.body
    const instances = registry.services[apiName].instances

    const index = instances.findIndex((srv) => { return srv.url === requestBody.url })
    if (index == -1) {
        res.send({ status: 'error', message: "Could not find '" + requestBody.url + "' for service '" + apiName + "'" })
    } else {
        instances[index].enabled = requestBody.enabled
        fs.writeFile(path.join(__dirname, '../config/registry.json'), JSON.stringify(registry), (error) => {
            if (error) {
                res.send("Could not enable/disable '" + requestBody.url + "' for service '" + apiName + ":'\n" + error)
            } else {
                res.send("Successfully enabled/disabled '" + requestBody.url + "' for service '" + apiName + "'\n")
            }
        })
    }
}

/**
 * Directs the request to the gateway to the relevant service, returns the result
 * 
 * @param {json} req
 * @param {json} res
 * @return {json} service response
 */
const serverRouter = async (req, res) => {
    const service = registry.services[req.params.apiName]
    if (service) {
        if (!service.loadBalanceStrategy) {
            service.loadBalanceStrategy = 'ROUND_ROBIN'
            fs.writeFile(path.join(__dirname, '../config/registry.json'), JSON.stringify(registry), (error) => {
                if (error) {
                    res.send("Couldn't write load balance strategy" + error)
                }
            })
        }

        const enabledService = service.instances.findIndex((i) => { return i.enabled === true });
        if (enabledService == -1) {
            res.send({ status: 'error', message: "There isn't an available service!" })
        } else {
            const newIndex = loadbalancer[service.loadBalanceStrategy](service)
            const url = service.instances[newIndex].url
            console.log('Loadbalancer running, Index:' + newIndex + ', url:' + url);
            await axios({
                method: req.method,
                url: url + req.params.path,
                headers: { "Content-Type": "application/json" },
                data: req.body
            }).then((response) => {
                console.log(response.data, " ***response");
                res.send(response.data)
            }).catch(error => {
                res.send(error)
            })
        }
    } else {
        res.send("API Name doesn't exist")
    }
}

module.exports = { handleServerEnable, serverRouter };