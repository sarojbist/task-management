const TaskModel = require("../../Models/TaskModel");

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, status } = req.body;

        //  get the task by id
        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // updating task
        title && (task.title = title);
        description && (task.description = description);
        status && (task.status = status);

        await task.save();

        return res.status(200).json({
            success: true,
            task,
            message: "Task Updated Successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Updating task failed due to: ${err.message}`,
        });
    }
};

module.exports = updateTask;
