'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const restaurants = await queryInterface.sequelize.query(
      'SELECT id FROM Restaurants;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    await queryInterface.bulkInsert('Comments',
      Array.from({ length: 50 }, () => ({
        text: 'this is seed comment!',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        restaurant_id: restaurants[Math.floor(Math.random() * restaurants.length)].id
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {})
  }
}
