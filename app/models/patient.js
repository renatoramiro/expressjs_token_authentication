var mongoose = require('mongoose');

module.exports = function (app) {
  var patientSchema = new mongoose.Schema({
    nome:     { type: String, required: true },
    convenio: { type: String, required: false },
    endereco:  { type: String, required: true }
  });

  return patientSchema;
};
