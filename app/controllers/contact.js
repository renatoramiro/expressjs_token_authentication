var contacts = [
  {_id: 1, firstname: 'Foo', lastname: 'Bar'},
  {_id: 2, firstname: 'FooFoo', lastname: 'BarBar'}
];

module.exports = function (app) {
  var controller = {};

  controller.index = function (req, res) {
    res.status(200).json(contacts);
  };

  controller.profile = function (req, res) {
    var idContact = req.params._id;
    var contact = contacts.filter(function (cont) {
      return cont._id == idContact;
    })[0];

    contact ? res.json(contact) : res.status(404).json({message: 'Contact not found'});
  };

  return controller;
};
