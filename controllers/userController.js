const { User, Thought } = require('../models');

module.exports = {
    //Get All Users 
    async getUsers(req,res) {
        try{
            const users = await User.find();

            //Return Success
            console.log('Returned All Users Successfuly');
            res.status(200).json(users);

        } catch(err) {
            //Error Handling
            console.log('Error Getting All Users', err);
            res.status(500).json({message: 'Error Getting All Users'});
        }
    },
    //Get Single User
    async getSingleUser(req,res) {
        try{
            const user = await User.findById(req.params.userId);

            //No User Found 
            if (!user) {
                console.log('No User with that ID');
                return res.status(404).json({message: 'No User with that ID'});
            }

            //Return Success
            console.log('Returned Single User Successfully');
            res.status(200).json(user);

        } catch(err) {
            //Error Handling
            console.log('Error Getting Single User', err);
            res.status(500).json({message: 'Error Getting Single User'});
        }
    },
    //Create New User
    async createUser(req,res) {
        try {
            const user = await User.create(req.body);

            //Return Success
            console.log('User Created Successfully')
            res.status(200).json(user);

        } catch (err) {
            //Error Handling
            console.log('Error Creating a User', err);
            res.status(500).json({message: 'Error Creating a User'});
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
                console.log('No User with that ID');
                return res.status(404).json({message: 'No User with that ID'});
            }

            //Return Success
            console.log('User Successfuly Updated');
            res.status(200).json(user);

        } catch(err) {
            //Error Handling 
            console.log('Error Updating User', err);
            res.status(500).json({message: 'Error Updating a User'});
        }
    },
    //Delete a Single User 
    async deleteUser(req,res) {
        try {
            const user = await User.findByIdAndRemove(req.params.userId);

            //No User Found 
            if (!user) {
                console.log('No User with that ID');
                return res.status(404).json({message: 'No User with that ID'});
            }

            //Delete User's Thoughts 
            await Thought.deleteMany({username: user.username});

            //Return Success 
            console.log('User and associated thoughts deleted successfully');
            res.status(200).json(user)

        } catch(err) {
            //Error Handling
            console.log('Error Deleting a User', err);
            res.status(500).json({message: 'Error Deleting a User'});
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
                console.log('No User with that ID');
                return res.status(404).json({message: 'No User with that ID'});
            }

            //Return Success
            console.log('Added Friend Successfully');
            res.status(200).json(user)

        } catch(err) {
            //Error Handling 
            console.log('Error Adding Friend', err);
            res.status(500).json({message: 'Error Adding Friend'});
        }
    },
    //Remove Friend 
    async deleteFriend(req,res) {
        try{
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                {$pull: {friends: req.params.friendId}},
                {new: true}
            );

            //No User Found 
            if (!user) {
                return res.status(404).json({message: 'No User with that ID'});
            }

            //Return Success
            console.log('Removed Friend Successfully');
            res.status(200).json(user)


        } catch(err) {
            //Error Handling 
            console.log('Error Removing Friend', err);
            res.status(500).json({message: 'Error Removing Friend'});
        }
    }
};