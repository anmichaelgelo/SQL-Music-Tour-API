const router = require('express').Router();
const db = require('../models')
const { Band } = db
const { Op } = require('sequelize')

// INDEX
router.get('/', async (req, res) => {
    try {
        const getBands = await Band.findAll({
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
            order: [['available_start_time', 'ASC']],
        })
        res.status(200).json(getBands)
    } catch (error) {
        res.status(500).json(error)
    }
});

// SHOW
router.get('/:id', async (req, res) => {
    try {
        const findBand = await Band.findOne({
            where: {band_id: req.params.id}
        })
        res.status(200).json(findBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// STORE
router.post('/', async (req, res) => {
    try {
        const createBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Band created successfully',
            data: createBand
        })

    }catch (error){
        res.status(500).json(error)
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        await Band.update(req.body, {
            where: {band_id: req.params.id}
        })

        res.status(200).json({
            message: 'Band updated successfully'
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE 
router.delete('/:id', async (req, res) => {
    try {
        await Band.destroy({
            where: {band_id: req.params.id}
        })

        res.status(200).json({
            message: 'Band deleted successfully'
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router