// establish user variable referencing user model
const { User } = require('../models');

const userController = {
    // get all users using Mongoose's find query
    getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
  
    // get user by id using Mongoose's findOne query 
    getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      // validate/err
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

    // create new user using Mongoose's create query 
    createUser({ body }, res) {
    User.create(body)
      // no validation possible
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

    // update user using Mongoose's findOneAndUpdate query
    updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      // validate/err
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

    // delete a user using Mongoose's findOneAndDelete query
    deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      // validate/err
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

    addFriend({ params, body }, res) {
    User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: body } },
          { new: true }
        )
      // validate/err
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  }

module.exports = userController;