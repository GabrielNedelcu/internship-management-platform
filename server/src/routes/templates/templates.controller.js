const { downloadTemplate } = require("../../utils/files.utils");

/**
 * @api {GET} /students/
 * @apiDescription Get all the students, depending on the user role
 * For ADMIN, no restrictions are applied; For COMPANY gets all the students
 * that have applied to offers of the company
 *
 * @apiSuccess array with the requested data or 204 if no student was found
 */
async function httpGetAnnex1(req, res) {
  return downloadTemplate(res, "annex_1.docx");
}

module.exports = {
  httpGetAnnex1,
};
