const db = require('../_common/db');

const findAll = async () => {
    const query = {
        text: "SELECT * FROM employees",
    };
    return await db.selectMany(query);
}

const findById = async (id) => {
    const query = {
        text: "SELECT * FROM employees WHERE id = $1",
        values: [id]
    };
    return await db.selectOne(query);
}


module.exports = {
    findAll,
    findById
}



