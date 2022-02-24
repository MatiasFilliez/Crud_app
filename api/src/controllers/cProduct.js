const { Tags, Product } = require('../db')

const getAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.findAll({
            include: { model: Tags }
        })
        allProduct.length
            ? res.status(200).json(allProduct)
            : res.status(404).json({ msg: 'empty database' })
    } catch (error) {
        console.log(error)
    }
}

const getProductById = (req, res) => {
    const { id } = req.params
    try {
        Product.findByPk(id, { include: { model: Tags } }).then((response) => {
            response
                ? res.status(200).json(response)
                : res.status(404).json({ msg: 'incorrect id product' })
        })
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, id, tagId } = req.body
        const newProduct = await Product.create({ id: id, name })
        if (tagId) await tagId.map((e) => newProduct.addTags(e))
        res.status(200).json({ msg: 'product has been created' })
    } catch (error) {
        console.log(error)
    }
}

const updateProduct = async (req, res) => {
    const { tagsId, name, productId } = req.body
    const { id } = req.params
    const findProduct = await Product.findByPk(id, {
        include: { model: Tags },
    })
    if (findProduct) {
        let idTags = [...findProduct.tags.map((elemento) => elemento.id_tag)]
        idTags?.map((idTag) => { findProduct.removeTags(idTag) })
        if (name) {
            if (productId) {
                Product.update({ id: productId, name }, {
                    where: { id: id }
                })
            } else {
                Product.update({ name }, {
                    where: { id: id }
                })
            }
        } else if (productId) {
            Product.update({ id: productId }, {
                where: { id: id }
            })
        }
        if (tagsId) tagsId.forEach((tag) => findProduct.addTags(tag))
        return res.json({ msg: "product has been update" })
    } else return res.status(404).json({ msg: "incorrect id product" })
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const checkProduct = await Product.findByPk(id)
    if (checkProduct) {
        Product.destroy({ where: { id: id } })
        res.status(200).json({ msg: "product has been deleted" })
    }
    res.status(404).json({ msg: "id error" })
}

module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}