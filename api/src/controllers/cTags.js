const { Tags, Product } = require('../db')

const getAllTags = async (req, res) => {
    const allTags = await Tags.findAll()
    allTags.length
        ? res.status(200).json(allTags)
        : res.status(404).json({ msg: 'empty database' })
}

const getTagById = (req, res) => {
    try {

        const { id } = req.params
        Tags.findByPk(id).then((response) => {
            response
                ? res.status(200).json(response)
                : res.status(404).json({ msg: "incorrect id tag" })
        })
    } catch (error) {
        console.log(error)
    }
}

const createTags = async (req, res) => {
    const { name, id_tag } = req.body
    const newTag = await Tags.create({ id_tag, name })
    newTag
        ? res.status(200).json({ msg: "tag has been created" })
        : res.send({ msg: "error" })
}

const updateTag = async (req, res) => {
    try {
        const { name, id_tag } = req.body;
        const { id } = req.params
        const findTag = await Tags.findByPk(id)
        if (findTag) {
            if (name) {
                if (id_tag) {
                    Tags.update({ id_tag: id_tag, name }, {
                        where: { id_tag: id }
                    })
                } else {
                    Tags.update({ name }, {
                        where: { id_tag: id }
                    })
                }
            } else if (id_tag) {
                Tags.update({ id_tag: id_tag }, {
                    where: { id_tag: id }
                })
            }
            return res.status(200).json({ msg: "tag has been update" })
        } else return res.status(404).json({ msg: "incorrect id tag" })

    } catch (error) {
        console.log(error)
    }
}

const deleteTag = (req, res) => {
    const { id } = req.params
    Tags.findByPk(id).then((response) => {
        if (response) {
            Tags.destroy({ where: { id_tag: id } })
            res.status(200).json({ msg: "tag has been deleted" })
        } else {
            res.status(404).json({ msg: "id error" })
        }
    })
}

module.exports = {
    getAllTags,
    getTagById,
    createTags,
    updateTag,
    deleteTag
}