
const Employee = require('../business/Employee');

module.exports = app => {

    app.get('/api/employees', async (req, res) => {

        const all = await Employee.findAll();
        res.send(all);
    });

};
