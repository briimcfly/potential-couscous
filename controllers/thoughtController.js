const { Thought, User } = require('../models');

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
            const thought = await Thought.create(req.body);

            //Push thought to user 
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$push: {thoughts: thought._id}},
                {runValidators:true, new:true}
            );

            //No User Found 
            if (!user){
                console.log('No User with that Username');
                return res.status(404).json({message: 'No User with that Username'})
            }

            //Return Success
            console.log('Thought Created and Added to User Successfully');
            res.status(200).json(thought);

        } catch(err) {
            //Error Handling
            console.log('Error Creating Thought', err);
            res.status(500).json({message: 'Error Creating Thought'});
        }
    },
    //Update a Thought
    async updateThought(req,res){
        try{
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$set: req.body},
                {runValidators: true, new:true}
            )

            //No Thought Found
            if (!thought) {
                console.log('No Thought with that ID');
                return res.status(404).json({message: 'No Thought with that ID'});
            }

            //Return Success
            console.log('Thought Updated Successfully');
            res.status(200).json(thought);
            
        } catch(err) {
            //Error Handling
            console.log('Error Updating Thought', err);
            res.status(500).json({message: 'Error Updating Thought'});
        }
    },
    //Delete a Thought 
    async deleteThought(req,res) {
        try{
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            //No Thought Found
            if (!thought) {
                console.log('No Thought with that ID');
                return res.status(404).json({message: 'No Thought with that ID'});
            }

            //Remove Thought from User's Thoughts 
            const user = await User.findOneAndUpdate(
                {username: thought.username},
                {$pull: {thoughts: thought._id}}
            );

            //Return Success
            console.log('Thought Deleted Successfully');
            res.status(200).json(thought);

        } catch(err) {
            //Error Handling
            console.log('Error Deleting Thought', err);
            res.status(500).json({message: 'Error Deleting Thought'});
        }
    }
}