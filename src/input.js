function Input(callback) {
  this.listen(callback);
}

Input.prototype.listen = (callback) => {
  document.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    callback(evt.key);
  });
}

module.exports = Input;