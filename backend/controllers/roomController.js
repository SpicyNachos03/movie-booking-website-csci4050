const Room = require('../models/roomModel');

const createRoom = async (req, res) => {
    const { roomName, numSeats } = req.body;

    const room = new Room({
        roomName,
        numSeats,
    });
    try {
        console.log("Here is the Room: ", Room);
        const savedRoom = await room.save();

        console.log('Saved Room:', savedRoom);
        res.status(201).json(savedRoom);
    } catch (error) {
        console.log("Error adding Room ", error);
        res.status(400).json({message: error.message});
    };
};

module.exports = { createRoom };