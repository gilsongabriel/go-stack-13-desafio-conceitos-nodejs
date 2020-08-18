const { isUuid } = require("uuidv4");

const uuidValidator = (request, response, next) => {
    const { id } = request.params;
    
    if (!isUuid(id)) {
        return response.status(400).json({ error: "Invalid Id"});
    }

    return next();
};

module.exports = uuidValidator;
