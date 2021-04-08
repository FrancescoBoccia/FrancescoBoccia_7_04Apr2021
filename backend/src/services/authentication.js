const bcrypt = require("bcrypt");

function passwordMustBeStrong(value) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/;
  if (!value.match(regex)) {
    throw new Error(
      "Password must contain at least 8 characters: one small and big letter, a number and a special character(@$!%*?&)"
    );
  }
}

function userAuthentication(User) {
  const encryptPassword = (user) => {
    if (user.changed("password")) {
      return bcrypt.hash(user.password, 10).then((hash) => {
        user.password = hash;
      });
    }
  };

  User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email, deleted: false } });

    if (!user) {
      return { valid: false, message: "User not found" };
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) return { valid: true, user };
    else return { valid: false, message: "Password incorrect" };
  };

  User.beforeCreate(encryptPassword);
  User.beforeUpdate(encryptPassword);
}

module.exports = {
  passwordMustBeStrong,
  userAuthentication,
};
