const TaskModel = require("../../Models/TaskModel");

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        //  get the task by id and delete
        const task = await TaskModel.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task Deleted Successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Deleting task failed due to: ${err.message}`,
        });
    }
};

module.exports = deleteTask;
