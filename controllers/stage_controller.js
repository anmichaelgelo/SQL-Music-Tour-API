const stage = require('express').Router();
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

// INDEX
stage.get('/', async (req, res) => {
    try {
        const getStages = await Stage.findAll({
            // attributes: ['stage_id', 'stage_name'],
            where: {
                stage_name: {[Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%`}
            },
            order: [['stage_name', 'ASC']],
        })
        res.status(200).json(getStages)
    } catch (error) {
        res.status(500).json(error)
    }
});

// SHOW
stage.get('/:id', async (req, res) => {
    try {
        const findStage = await Stage.findOne({
            where: {stage_id: req.params.id}
        })
        res.status(200).json(findStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

// STORE
stage.post('/', async (req, res) => {
    try {
        const createStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Stage created successfully',
            data: createStage
        })

    }catch (error){
        res.status(500).json(error)
    }
});

// UPDATE
stage.put('/:id', async (req, res) => {
    try {
        await Stage.update(req.body, {
            where: {stage_id: req.params.id}
        })

        res.status(200).json({
            message: 'Stage updated successfully'
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE 
stage.delete('/:id', async (req, res) => {
    try {
        await Stage.destroy({
            where: {stage_id: req.params.id}
        })

        res.status(200).json({
            message: 'Stage deleted successfully'
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stage