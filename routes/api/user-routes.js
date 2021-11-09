const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend
  } = require('../../controllers/user-controller');

// GET all users, POST new user
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// GET, PUT and DELETE user by id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

// POST and DELETE friend by id
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  // .delete(deleteFriend)


module.exports = router;