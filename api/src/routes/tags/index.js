
const { Router } = require('express');
const {
    getAllTags,
    getTagById,
    createTags,
    updateTag,
    deleteTag
} = require('../../controllers/cTags');

const router = Router();

router.get('/', getAllTags)
router.get('/:id', getTagById)
router.post('/', createTags)
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)

module.exports = router;