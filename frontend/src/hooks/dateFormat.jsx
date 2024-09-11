export const DateFormat = ({ isoDateString }) => {
    // Función para convertir la fecha
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son base 0
        const year = date.getUTCFullYear();
        
        
        return `${day}/${month}/${year}`;
    };

    return (
        <>
         {formatDate(isoDateString)}
        </>
    );
};