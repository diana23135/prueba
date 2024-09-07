const sequelize = require('./models/sequelize');
sequelize.sync({ force: true })
.then(() => {
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});