const path = require("path");
const fs = require("fs").promises;

/**
 * Generates the path to a file uploaded by the user
 *
 * @param {String} directory - The directory in which the file is located
 * @param {String} fileName  - The name of the file
 *
 * @return {String}          - The path to the file
 */
function getUploadedFilePath(directory, fileName) {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    directory,
    fileName
  );

  return filePath;
}

/**
 * Uploads the files sent in the request body
 *
 * @param {Request} req       - The request made by the client
 * @param {String}  directory - The directory in which the file will be stored
 * @param {String}  fileName  - The new , generated, name of the file
 *
 * @return {String}          - The path to the uploaded file
 */
async function uploadFilesFromRequest(req, directory, fileName) {
  const filePath = getUploadedFilePath(directory, fileName);

  if (!req.files) {
    const err = new Error("No files uploaded!");
    err.statusCode = 400;
    throw err;
  }

  for await (const key of Object.keys(req.files)) {
    req.files[key].mv(filePath, (err) => {});
  }

  return filePath;
}

/**
 * Deletes an uploaded file
 *
 * @param {String}  directory - The directory in which the file is located
 * @param {String}  fileName  - The file name
 *
 * @return {Void}
 */
async function deleteUploadedFile(directory, fileName) {
  await fs.unlink(getUploadedFilePath(directory, fileName));
}

/**
 * Downloads a file on the server and sends it to he client through
 * a response object
 *
 * @param {Response} res       - The response that will carry the file
 * @param {String}   directory - The directory in which the file is located
 * @param {String}   fileName  - The file name
 *
 * @return {Void}
 */
async function downloadUploadedFile(res, directory, fileName) {
  return res.status(200).download(getUploadedFilePath(directory, fileName));
}

/**
 * Downlaod a template file
 * @param {*} res The response that will carry the file
 * @param {*} templateName The template name
 * @returns
 */
async function downloadTemplate(res, templateName) {
  return res
    .status(200)
    .download(
      path.join(__dirname, "..", "..", "public", "templates", templateName)
    );
}

module.exports = {
  uploadFilesFromRequest,
  deleteUploadedFile,
  downloadUploadedFile,
  downloadTemplate,
};
