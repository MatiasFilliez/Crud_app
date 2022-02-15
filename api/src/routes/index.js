const { Router } = require('express');
const tagsRoutes = require('./tags')
const productRoutes = require('./product')

const router = Router();

router.use('/tags', tagsRoutes)
router.use('/product', productRoutes)

module.exports = router;