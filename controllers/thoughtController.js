const { Thought, User } = require('../models');

//Success Handler
function success(res, msg, pyld, code) {
    console.log(msg);
    res.status(code).json(pyld);
}

//Error Handler 
function error(res, msg, err, code) {
    if (err) {
        console.log(msg, err);
    } else {
        console.log(msg);
    }
    res.status(code).json({message: msg});
}

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
            const user = await User.findByIdAndUpdate(
                req.body.userId,
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
            const thought = await Thought.findById(req.params.thoughtId);

            //No Thought Found
            if (!thought) {
                console.log('No Thought with that ID');
                return res.status(404).json({message: 'No Thought with that ID'});
            }

            //Remove Thought from User's Thoughts 
            const user = await User.findByIdAndUpdate(
                thought.userId,
                {$pull: {thoughts: thought._id}}
            );
            
            //Delete the Thought
            await Thought.findByIdAndDelete(req.params.thoughtId);

            //Return Success
            console.log('Thought Deleted Successfully');
            res.status(200).json({message: "Successfully Deleted Thought"});

        } catch(err) {
            //Error Handling
            console.log('Error Deleting Thought', err);
            res.status(500).json({message: 'Error Deleting Thought'});
        }
    },
    //Add a Reaction 
    async addReaction(req,res) {
        try{
            //find the associated User ID 
            const user = await User.findOne({username: req.body.username});

            //No User
            if (!user) {error(res, 'No User with that ID', null, 404);}

            //Create Reaction object 
            const reaction  = {
                reactionBody: req.body.reactionBody,
                username: req.body.username,
                userId: user._id
            }

            //Find the Thought to React to 
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$push: {reactions: reaction}},
                {runValidators: true, new:true}
            )
            
            //No Thought Found
            if (!thought) {error(res, 'No Thought with that ID', null, 404);}

            //Return Success
            console.log('Reaction Added Successfully');
            res.status(200).json(thought);

        }  catch(err) {
            //Error Handling
            console.log('Error Adding Reaction', err);
            res.status(500).json({message: 'Error Adding Reaction'});
        }
    },
    //Delete a Reaction 
    async deleteReaction(req,res) {
        try{
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {new: true}
            );

            //No Thought Found
            if (!thought) {
                console.log('No Thought with that ID');
                return res.status(404).json({message: 'No Thought with that ID'});
            }

            //Return Success
            console.log('Reaction Deleted Successfully');
            res.status(200).json(thought);

        }  catch(err) {
            //Error Handling
            console.log('Error Deleting Reaction', err);
            res.status(500).json({message: 'Error Deleting Reaction'});
        }
    }
}