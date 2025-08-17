import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
            minlength: [3, "First name must be length of 6 char"],
        },
        lastname: {
            type: String,
            require: true,
            minlength: [3, "Last name must be length of 6 char"],
        },
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minlength: [5, "email must be length of 5 char"],
    },
    password: {
        type: String,
        require: true,
        select: false,
    },

    socketId: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
