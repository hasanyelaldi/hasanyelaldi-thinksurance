const fs = require('fs');
const path = require('path');

/**
 * Read all files under the people folder, parse the data into the same person objects and returns Person List.
 * 
 * @param {json} req
 * @param {json} res
 * @return {json} Person List
 */
const getAll = (req, res) => {
    const jsonsInDir = fs
        .readdirSync(path.join(__dirname, '../people'))
        .filter((file) => path.extname(file) === '.json');

    const result = [];

    jsonsInDir.forEach((file) => {
        const fileData = fs.readFileSync(
            path.join(__dirname, '../people', file)
        );
        result.push(JSON.parse(fileData.toString()));
    });
    res.status(200).json(result);
};

module.exports = { getAll };