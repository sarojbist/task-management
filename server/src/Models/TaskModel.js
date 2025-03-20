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
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId, ref: "user",
        },
        priority: {
            type: Number, 
            enum: [1,2,3],
            required: true
        }
    }, {
    timestamps: true
}
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;