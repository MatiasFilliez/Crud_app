const { Router } = require('express');

const {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../../controllers/cProduct');

const router = Router();

router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
module.exports = router;