const TaskModel = require("../../Models/TaskModel");

const addtask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        
        if (!title ) {
            return res.status(403).send({
                success: false,
                message: "At least title is required",
            });
        }

        // creating task model instance
        const task = new TaskModel({
            title,
            description,
            status,
        })
       await task.save();

        return res.status(200).json({
            success: true,
            message: "Task Added Successfully",
            task
        });


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Adding Taks failed due to: ${err.message}`,
       
        });
    }
}

module.exports = addtask;