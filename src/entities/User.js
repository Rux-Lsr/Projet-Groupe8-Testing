class User {
  constructor({ id, name, password }) {
    this.id = id;
    this.name = name;
    this.password = password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

module.exports = User;
