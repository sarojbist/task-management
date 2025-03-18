const TaskModel = require("../../Models/TaskModel");

const getTasks = async (req, res) => {
    try {
        // Get query params with defaults
        let { page = 1, limit = 10 } = req.query;

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

        // paginated tasks on the baisis of newly added
        const tasks = await TaskModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            tasks,
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
