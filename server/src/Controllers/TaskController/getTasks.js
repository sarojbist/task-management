const TaskModel = require("../../Models/TaskModel");

const getTasks = async (req, res) => {
    const { userId } = req.user;
    console.log("user is", userId)
    try {
        // Get query params with defaults
        let { page = 1, limit = 5, status = "" } = req.query;

        // Convert to integers
        page = parseInt(page);
        limit = parseInt(limit);

        // both should be positive
        if (page < 1 || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Page and limit must be positive numbers",
            });
        }

        // number of documents to skip
        const skip = (page - 1) * limit;
        let filter = { addedBy: userId };
        // adding filter
        if (status) {
            filter["status"] = status;
        }

        // paginated tasks on the baisis of newly added
        // it should be sorted on the basis of priority
        const tasks = await TaskModel.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log(tasks)
        const newTasks = tasks.sort((a, b) => a.priority - b.priority)
        console.log("new tasks", newTasks)

        if (tasks.length === 0) {
            return res.status(200).json({
                success: true,
                tasks: [],
                message: "No tasks available",
            });
        }

        return res.status(200).json({
            success: true,
            tasks: newTasks,
            message: "Tasks Fetcheded Successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Fetching tasks failed due to: ${err.message}`,
        });
    }
};

module.exports = getTasks;
