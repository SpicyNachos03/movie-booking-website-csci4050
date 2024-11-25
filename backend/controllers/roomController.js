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

const getRooms = async (req, res) => {
    try {
        console.log('Attempting to fetch rooms...');
        const rooms = await Room.find();
        res.json(rooms);
        console.log('Rooms fetched successfully:', rooms);
      } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ message: 'Error fetching rooms', error: error.message });
      };
};

module.exports = { createRoom, getRooms };