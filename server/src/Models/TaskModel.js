const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        status: {
            type: String,
            enum: ["Pending", "InProgress", "Completed"],
            default: "Pending"
        }
    }, {
    timestamps: true
}
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;