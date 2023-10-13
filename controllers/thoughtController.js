const { Thought } = require('../models');

module.exports = {
    //Get All Thoughts
    async getThoughts(req,res) {
        try{
            const thoughts = await Thought.find();

            //Return Success
            console.log('Returned All Thoughts Successfuly');
            res.status(200).json(thoughts);   

        } catch(err) {
            //Error Handling
            console.log('Error Getting All Thoughts', err);
            res.status(500).json({message: 'Error Getting All Thoughts'});
        }
    },
    //Get Single Thought
    async getSingleThought(req,res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);

            //No Thought Found
            if (!thought) {
                console.log('No Thought with that ID');
                return res.status(404).json({message: 'No Thought with that ID'});
            }

            //Return Success
            console.log('Single Thought Returned Successfully');
            res.status(200).json(thought);

        } catch(err) {
            //Error Handling
            console.log('Error Getting All Thoughts', err);
            res.status(500).json({message: 'Error Getting All Thoughts'});
        }
    },
    //Create a Thought
    async createThought(req,res) {
        try {
            const thought = await Thought.create(req,body);

            //Return Success
            console.log('Thought Created Successfully');
            res.status(200).json(thought);

        } catch(err) {
            //Error Handling
            console.log('Error Creating Thought', err);
            res.status(500).json({message: 'Error Creating Thought'});
        }
    }
}