
const Estados = require('./models/estados');
const sequelize = require('./models/sequelize');
sequelize.sync({ force: false })
.then(async () => {
    
    await Estados.bulkCreate([
        { nombreEstados: 'Pendiente' },
        { nombreEstados: 'En proceso' },
        { nombreEstados: 'Inactivo' },
        
    ]);
    console.log('Database synchronized');
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});