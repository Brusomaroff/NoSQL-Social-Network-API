const router = require("express").Router();

const {
  getSingleThought,
  getThought,
  createThought,
  deleteThought,
  updateThought,
  deleteReaction,
  createReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThought).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

router.route("/:thoughtId/reactions").post(createReaction);

module.exports = router;
