const { Pool } = require('pg');
const _ = require('lodash');

const pool = getPool();

function getPool() {
    return new Pool({
        connectionString: process.env.CONNECTION_STRING
    });
}

function lowerCaseFirstLetter(word) {
    return word.charAt(0).toLowerCase() + word.slice(1);
}

function convertToCamel(obj) {
    let result = {};

    for (var key in obj) {
        let newKey = key
            .split('_')
            .map(_.capitalize).join('');
        newKey = lowerCaseFirstLetter(newKey);
        result[newKey] = obj[key];

    }

    return result;
}

async function execute(query) {

    const client = await pool.connect();
    try {
        const res = await client.query(query);
        return convertToCamel(res.rows[0]);

    } catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

async function selectOne(query) {
    const client = await pool.connect();
    try {
        const res = await client.query(query);
        return convertToCamel(res.rows[0]);
    } catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}


async function selectMany(query) {
    const client = await pool.connect();
    try {
        const res = await client.query(query);
        return _.map(res.rows, row => convertToCamel(row));

    } catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

async function executeInTransaction(callback) {

    const client = await pool.connect();
    try {

        await client.query('BEGIN');

        await callback(client);

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw new Error('Error occurred!');
    }
    finally {
        client.release();
    }

}


module.exports = { execute, selectOne, selectMany, executeInTransaction } 