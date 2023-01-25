const events = require('express').Router();
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

// INDEX
events.get('/', async (req, res) => {
    try {
        const getEvents = await Event.findAll({
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
            order: [['start_time', 'ASC']],
        })
        res.status(200).json(getEvents)
    } catch (error) {
        res.status(500).json(error)
    }
});

// SHOW
events.get('/:id', async (req, res) => {
    try {
        const findEvent = await Event.findOne({
            where: {event_id: req.params.id}
        })
        res.status(200).json(findEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// STORE
events.post('/', async (req, res) => {
    try {
        const createEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Event created successfully',
            data: createEvent
        })

    }catch (error){
        res.status(500).json(error)
    }
});

// UPDATE
events.put('/:id', async (req, res) => {
    try {
        await Event.update(req.body, {
            where: {event_id: req.params.id}
        })

        res.status(200).json({
            message: 'Event updated successfully'
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE 
events.delete('/:id', async (req, res) => {
    try {
        await Event.destroy({
            where: {event_id: req.params.id}
        })

        res.status(200).json({
            message: 'Event deleted successfully'
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = events