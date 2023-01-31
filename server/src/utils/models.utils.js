/**
 * Retrieve the major of a student based on his group
 * @param {String} group The group of the student
 * @returns The abreviation of his major
 */
function getStudentMajor(group) {
  const series = group.slice(-1);
  switch (series) {
    case "A":
      return "CTI";
    case "B":
      return "ELA";
    case "C":
      return "TST";
    case "D":
      return "RST";
    case "E":
      return "MON";
    case "F":
      return "ELA_EN";
    case "G":
      return "TST_EN";
    default:
      return "UNK";
  }
}

module.exports = {
  getStudentMajor,
};
