const { User, Thought } = require('../models');

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

console.log('this is a test');

module.exports = {
    //Get All Users 
    async getUsers(req,res) {
        try{
            const users = await User.find().populate('friends');

            //Return Success
            success(res, 'Returned All Users Successfully', users, 200);

        } catch(err) {
            //Error Handling
            error(res, 'Error Getting All Users', err, 500);
        }
    },

    //Get Single User
    async getSingleUser(req,res) {
        try{
            const user = await User.findById(req.params.userId)
            .populate('friends')
            .populate({
                path: 'friends',
                select: '_id'
            })

            //No User Found 
            if (!user) {
                error(res, 'No User with that ID', null, 404);
            }

            //Return Success
            success(res, 'Returned Single User Successfully', user, 200);

        } catch(err) {
            //Error Handling
            error(res, 'Error Getting Single User', err, 500);
        }
    },

    //Create New User
    async createUser(req,res) {
        try {
            const user = await User.create(req.body);

            //Return Success
            success(res, 'User Created Successfully', user, 201);

        } catch (err) {
            //Error Handling
            error(res, 'Error Creating a User', err, 500);
        }
    },

    //Update a Single User 
    async updateUser(req,res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                {$set: req.body},
                {runValidators: true, new: true}
            )

            //No User Found 
            if (!user) {
                return error(res, 'No User with that ID', null, 404);
            }

            //Return Success
            success(res, 'User Successfuly Updated', user, 200);

        } catch(err) {
            //Error Handling 
            error(res, 'Error Updating a User', err, 500);
        }
    },

    //Delete a Single User 
    async deleteUser(req,res) {
        try {
            //Find the User by ID
            const user = await User.findById(req.params.userId);

            //No User Found 
            if (!user) {
                return error(res, 'No User with that ID', null, 404);
            }

            //Delete User's Thoughts 
            await Thought.deleteMany({userId: user._id});

            //Delete Orphaned Reactions 
            const thoughts = await Thought.find();
            //Loop through thoughts
            for (let thought of thoughts) {
                //Filter and store thoughts associated with deleted user
                const deleteReactions = thought
                .reactions
                .filter(reaction =>
                    //Compare User ID strings 
                    reaction.userId.toString() === user._id.toString())
                
                //If reactions from user in current thought... 
                if(deleteReactions.length) {
                    //Remove reactions of Deleted User
                    thought.reactions = thought
                    .reactions
                    .filter(reaction => 
                        //Keep all other reactions
                        reaction.userId.toString() !== user._id.toString());
                        
                    //Save the thought doc with updated reaction array
                    await thought.save();
                }
            }

            //Delete User
            await User.findByIdAndDelete(req.params.userId);

            //Return Success 
            success(res, 'User, along with their associated Thoughts and Reactions deleted successfully', user, 200);

        } catch(err) {
            //Error Handling
            error(res, 'Error Deleting a User', err, 500);
        }
    },
    //Add Friend 
    async addFriend(req,res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                {$addToSet: {friends: req.body.friendId}},
                {runValidators: true, new: true}
            )

            //No User Found 
            if (!user) {
                return error(res, 'No User with that ID', null, 404);
            }

            //Return Success
            success(res, 'Added Friend Successfully', user, 200);

        } catch(err) {
            //Error Handling 
            error(res, 'Error Adding Friend', err, 500);
        }
    },
    //Remove Friend 
    async deleteFriend(req,res) {
        try{
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                {$pull: {friends: req.body.friendId}},
                {new: true}
            );

            //No User Found 
            if (!user) {
                return error(res, 'No User with that ID', null, 404);
            }

            //Return Success
            success(res, 'Removed Friend Successfully', user, 200);


        } catch(err) {
            //Error Handling 
            error(res, 'Error Removing Friend', err, 500);
        }
    }
};