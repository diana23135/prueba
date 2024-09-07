const validateDto = function (dto) {
    return (req, res, next) => { //retorno del servicio
      const receivedFields = Object.keys(req.body);
      const missingFields = dto.requiredFields.filter(field => !receivedFields.includes(field));
  
      if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
      }
  
      next();
    };
  }
  
  module.exports = validateDto;