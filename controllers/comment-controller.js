const { Comment, User, Restaurant } = require('../models')

const commentController = {
  postComment: (req, res, next) => {
    const { restaurantId, text } = req.body
    const userId = req.user.id

    if (!text) throw new Error('Comment text is required!')

    Promise.all([
      User.findByPk(userId),
      Restaurant.findByPk(restaurantId)
    ])
      .then(([user, restaurant]) => {
        if (!user) throw new Error('User does not exist!')
        if (!restaurant) throw new Error('Restaurant does not exist!')

        return Comment.create({
          text,
          userId,
          restaurantId
        })
      })
      .then(() => {
        res.redirect(`/restaurants/${restaurantId}`)
      })
      .catch(err => next(err))
  },
  deleteComment: (req, res, next) => {
    Comment.findByPk(req.params.id)
      .then(comment => {
        if (!comment) throw new Error('Comment does not exist!')

        return comment.destroy()
      })
      .then(deletedComment => res.redirect(`/restaurants/${deletedComment.restaurantId}`))
      .catch(err => next(err))
  }
}

module.exports = commentController
