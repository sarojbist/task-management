const TaskModel = require("../../Models/TaskModel");

const addtask = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;
        const { userId } = req.user;
        
        if (!title ) {
            return res.status(403).send({
                success: false,
                message: "At least title is required",
            });
        }
        if (isNaN(priority)) {
            {
                return res.status(403).send({
                    success: false,
                    message: "Priority should be a number",
                });
            }
        }

        // creating task model instance
        const task = new TaskModel({
            title,
            description,
            status,  
            addedBy: userId,
            priority
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