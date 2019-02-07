const express = require('express')
const router = express.Router()
const itemController = require('./itemController')

router.get('/item', itemController.index)
router.post('/item', itemController.store)
router.get('/item/:id', itemController.findById)
router.put('/item/:id', itemController.update)
router.delete('/item/:id', itemController.delete)

module.exports = router
