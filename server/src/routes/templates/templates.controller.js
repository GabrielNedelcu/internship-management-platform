const { downloadTemplate } = require("../../utils/files.utils");

async function httpGetAnnex1(req, res) {
  return downloadTemplate(res, "annex_1.docx");
}

async function httpGetTripartit(req, res) {
  return downloadTemplate(res, "tripartit_convention.docx");
}

async function httpGetAnnex7(req, res) {
  return downloadTemplate(res, "annex_7.docx");
}
async function httpGetAnnex2(req, res) {
  return downloadTemplate(res, "annex_2.docx");
}
async function httpGetAnnex3(req, res) {
  return downloadTemplate(res, "annex_3.docx");
}

module.exports = {
  httpGetAnnex1,
  httpGetTripartit,
  httpGetAnnex7,
  httpGetAnnex2,
  httpGetAnnex3,
};
