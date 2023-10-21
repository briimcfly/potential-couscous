//Models
const { Thought, User } = require('../models');

//Success/Error Helpers 
const { error, success } = require('../utils/helper');

module.exports = {

    // THOUGHTS
    // GET
    // ALL

    async getThoughts(req,res) {
        try{
            //Find Thoughts
            const thoughts = await Thought.find();

            //Return Success
            success(res, 'Returned All Thoughts Successfuly', thoughts, 200);

        } catch(err) { error(res, 'Error Getting All Thoughts', err, 500); }
    },

    // THOUGHTS
    // GET
    // ONE

    async getSingleThought(req,res) {
        try {
            //Find Thought by ID
            const thought = await Thought.findById(req.params.thoughtId);

            //No Thought Found
            if (!thought) {error(res, 'No Thought with that ID', null, 404)};

            //Return Success
            success(res,'Single Thought Returned Successfully', thought,200);

        } catch(err) { error(res, 'Error Getting Single Thought', err, 500)};
    },

    // THOUGHTS
    // CREATE
    // ONE

    async createThought(req,res) {
        try {
            const user = await User.findOne({username: req.body.username});

            //No User Found 
            if (!user) {error(res, 'No User with that Username', null, 404)};

            const incomingThought = {
                thoughtText: req.body.thoughtText,
                username: req.body.username,
                userId: user._id
            }

            const thought = await Thought.create(incomingThought);

            //Push thought to user 
            await User.findByIdAndUpdate(
                req.body.userId,
                {$push: {thoughts: thought._id}},
                {runValidators:true, new:true}
            );

            //No User Found 
            if (!user) {error(res, 'No User with that Username', null, 404)};

            //Return Success
            success(res,'Thought Created and Added to User Successfully', thought, 200);

        } catch(err) { error(res, 'Error Creating Thought', err, 500)};
    },

    // THOUGHTS
    // UPDATE
    // ONE

    async updateThought(req,res){
        try{
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$set: req.body},
                {runValidators: true, new:true}
            )

            //No Thought Found
            if (!thought) { error(res, 'No Thought with that ID', null, 404)};

            //Return Success
            success(res, 'Thought Updated Successfully', thought, 200);
            
        } catch(err) {error(res, 'Error Updating Thought', err, 500)};
    },

    // THOUGHTS
    // DELETE
    // ONE

    async deleteThought(req,res) {
        try{
            const thought = await Thought.findById(req.params.thoughtId);

            //No Thought Found
            if (!thought) { error(res, 'No Thought with that ID', null, 404)};

            //Remove Thought from User's Thoughts 
            await User.findByIdAndUpdate(
                thought.userId,
                {$pull: {thoughts: thought._id}}
            );
            
            //Delete the Thought
            await Thought.findByIdAndDelete(req.params.thoughtId);

            //Return Success
            success(res, 'Thought Deleted Successfully', {message: "Successfully Deleted Thought"}, 200);

        } catch(err) { error(res,'Error Deleting Thoughts', err, 500)};
    },
    
    // REACTIONS
    // CREATE
    // ONE

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
            success(res,'Reaction Added Successfully', thought, 200);

        }  catch(err) {error(res, 'Error Adding Reaction', err, 500)};
    },

    // REACTIONS
    // DELETE
    // ONE 

    async deleteReaction(req,res) {
        try{
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {$pull: {reactions: {_id: req.body.reactionId}}},
                {new: true}
            );

            //No Thought Found
            if(!thought){return error(res,'No Thought with that ID',null,404)};

            //Return Success
            success(res,'Reaction Deleted Successfully',thought,200);

        }  catch(err){error(res,'Error Deleting Reaction',err,500)};
    }
}