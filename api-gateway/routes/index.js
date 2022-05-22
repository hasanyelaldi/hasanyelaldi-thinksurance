const router = require('express').Router()

const ROLES_LIST = require('../util/roles');
const routerController = require('../controllers/routerController');
const verifyRoles = require('../middleware/verifyRoles');

router.post('/enable/:apiName', verifyRoles(ROLES_LIST.Admin), routerController.handleServerEnable)
router.all('/:apiName/:path', routerController.serverRouter)

module.exports = router