const express = require('express')
const router = express.Router()
module.exports = router

router.use('/api/v1', require('@api/item/itemRoutes.js'))
