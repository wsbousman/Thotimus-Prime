const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThought,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

// GET all thoughts
router
  .route('/')
  .get(getAllThoughts)

// POST thoughts to /api/thoughts/<userId>
router
  .route('/:userId')
  .post(addThought);

// GET, PUT and DELETE thoughts by id at: /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .get(getThought)
  .put(updateThought)
  .delete(removeThought)

// POST reaction at: /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .post(addReaction)

// DELETE reaction by id at: /api/thoughts/<userId>/<thoughtId>/<reactionId>
router
  .route('/:userId/:thoughtId/:reactionId')
  .delete(removeReaction);

module.exports = router;