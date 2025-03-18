const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        regName: { type: String, required: true },
        regEmail: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }, {
    timestamps: true
}
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;