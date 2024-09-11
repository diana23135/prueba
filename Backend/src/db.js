const Estados = require('./models/estados');
const sequelize = require('./models/sequelize');

const estadosToAdd = [
    { nombreEstados: 'Pendiente' },
    { nombreEstados: 'En proceso' },
    { nombreEstados: 'Inactivo' },
];

sequelize.sync({ force: false })
.then(async () => {
    try {
        // Verificar qué estados ya existen
        const existingStates = await Estados.findAll({
            where: {
                nombreEstados: estadosToAdd.map(e => e.nombreEstados)
            }
        });

        // Extraer los nombres de los estados existentes
        const existingStateNames = existingStates.map(e => e.nombreEstados);

        // Filtrar los estados que no existen
        const newStates = estadosToAdd.filter(e => !existingStateNames.includes(e.nombreEstados));

        // Registrar solo los nuevos estados
        if (newStates.length > 0) {
            await Estados.bulkCreate(newStates);
            console.log('New states added:', newStates);
        } else {
            console.log('No new states to add.');
        }
    } catch (error) {
        console.error('Failed to synchronize database:', error);
    }
})
.catch((error) => {
    console.error('Failed to synchronize database:', error);
});
