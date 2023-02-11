const fs = require("fs");

const readXlsxFile = require("read-excel-file/node");

const logger = require("../config/logger.config");

const studentSchema = {
  Nume: {
    prop: "name",
    type: String,
    required: true,
  },
  Grupa: {
    prop: "group",
    type: String,
    required: true,
  },
  CNP: {
    prop: "cnp",
    type: String,
    required: false,
  },
  Pasaport: {
    prop: "passport",
    type: String,
    required: false,
  },
  Email: {
    prop: "email",
    type: String,
    required: true,
  },
};

const professorSchema = {
  Nume: {
    prop: "name",
    type: String,
    required: true,
  },
  Functia: {
    prop: "title",
    type: String,
    required: true,
  },
  Telefon: {
    prop: "private_phone",
    type: String,
    required: true,
  },
  "Telefon-conventie": {
    prop: "public_phone",
    type: String,
    required: true,
  },
  Email: {
    prop: "email",
    type: String,
    required: true,
  },
  Departament: {
    prop: "departament",
    type: String,
    required: true,
  },
};

/**
 * Reads an excel file and returns a list of all the json objects found
 * Each row of the file will be mapped to an object through the defined schema
 * The first row in the file must have the column titles as presented in the schema
 *
 * @param {String}  filePath - The path of the file
 * @param {JSON}    schema   - The schema used to map each row to an object
 *
 * @return {Array}           - Array of the objects read
 */
async function parseExcel(filePath, schema) {
  const { rows, errors } = await readXlsxFile(fs.createReadStream(filePath), {
    schema,
  });

  if (errors.length) {
    const err = new Error(
      "Error while parsing the excel file. No objects were retrieved."
    );
    throw err;
  }

  logger.info(`Finished parsing excel file ... found ${rows.length} rows`);
  return rows;
}

module.exports = { parseExcel, studentSchema, professorSchema };
