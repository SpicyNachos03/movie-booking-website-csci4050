const Show = require('../models/showModel');

const createShow = async (req, res) => {
    const { movieId, dateTime, roomId } = req.body;

    const show = new Show({
        movieId,
        dateTime,
        roomId,
    });

    try {
        console.log("Here is the Show: ", show);
        const savedShow = await show.save();

        console.log('Saved Show:', savedShow);
        res.status(201).json(savedShow);
    } catch (error) {
        console.log("Error adding Show ", error);
        res.status(400).json({message: error.message});
    };
};

const getShowById = async (req, res) => {
    const { id } = req.body;
    
    try {
        const show = await Show.findById(id);
        if (!show) {
            console.error(`Show with ID ${id} not found in database.`);
            return res.status(404).json({ message: 'Show not found' });
        }

        res.json(show);
    } catch (error) {
        console.error(`Error fetching show with ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error fetching show', error: error.message });
    };
};

module.exports = { createShow, getShowById };