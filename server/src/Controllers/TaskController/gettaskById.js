const TaskModel = require("../../Models/TaskModel");

const getTaskById = async (req, res) => {
    try {
     const {id} = req.params;



    //  get the task by id
        const task = await TaskModel.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            task,
            message: "Task Fetched Successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Fetching task failed due to: ${err.message}`,
        });
    }
};

module.exports = getTaskById;
