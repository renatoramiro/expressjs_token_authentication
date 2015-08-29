module.exports = function (app) {
  var controller = {};
  var User = app.models.user;

  controller.index = function (req, res) {
    var username = req.params.username;
    User.findOne({username: req.params.username}, function (err, user) {
      if (err) return res.status(400).json(err);
      if (!user) {
        return res.status(400).json(err);
      } else if (user) {
        return res.status(200).json({patients: user.patients});
      }
    });
  };

  controller.detail = function (req, res) {
    var username = req.params.username;
    var id = req.params._id;
    var patient = {};
    User.findOne({username: req.params.username}, function (err, user) {
      if (err) return res.status(400).json(err);
      if (!user) {
        return res.status(400).json(err);
      } else if (user) {
        patient = user.patients.id(id);
        if (patient == null) {
          return res.status(200).json({patient: patient, message: 'Patient not found'});
        }
        return res.status(200).json({patient: patient});
      }
    });
  };

  controller.create = function (req, res) {
    var username = req.params.username;

    var patientParam = {
      nome: req.body.nome,
      convenio: req.body.convenio,
      endereco: req.body.endereco
    };

    if (invalidFields(patientParam)) {
      return res.json({success: false, message: 'You need fill all fields'});
    }

    User.findOne({username: username}, function (err, user) {
      if (err) return res.status(400).json(err);

      if (!user) {
        return res.status(400).json(err);
      } else if (user) {
        user.patients.push(patientParam);
        user.save(function (err) {
          if (err) return res.json(err);
          return res.status(200).json(patientParam);
        });
      }
    });
  }

  controller.remove = function (req, res) {
    var username = req.params.username;
    var id = req.body._id;

    User.findOne({username: username}, function (err, user) {
      if (err) return res.status(400).json(err);
      if (!user) {
        return res.status(400).json(err);
      } else if (user) {
        user.patients.id(id).remove();
        user.save(function (err) {
          if (err) return res.json(err);
          return res.status(200).json({success: true, message: 'Successfully removed.'});
        });
      }
    })
  }

  var invalidFields = function (patient) {
    if ((patient.nome.trim() === '' || patient.nome === undefined) ||
        (patient.convenio.trim() === '' || patient.convenio === undefined) ||
        (patient.endereco.trim() === '' || patient.endereco === undefined)) {
      return true;
    } else {
      return false;
    }
  }
  return controller;
}
