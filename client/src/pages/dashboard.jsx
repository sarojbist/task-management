import React, { useEffect, useState } from "react"
import SimpleModal from "../components/addTask"
import authStore from "../stores/authStore";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export function DashboardPage() {
    const userInfo = authStore((state) => state.userInfo);
    const token = authStore((state) => state.token);

    const [page, setPage] = useState(1);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                if (!token) return;

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await axios.get(`${BASE_URL}/tasks/get-tasks?page=${page}`, config);
                setTasks(response.data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [page]);

    return (
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 min-h-screen ">
            <div className="flex justify-between items-center max-w-md py-4 mx-auto">
                <h2 className="text-xl font-semibold text-white">Welcome, {userInfo?.regName}!</h2>
                <SimpleModal />
            </div>
            <h3 className="text-3xl font-semibold text-blue-300 text-center ">Your Tasks</h3>
            <div className="w-[950px] min-h-[70vh] mx-auto mt-6 bg-white rounded-lg shadow-lg p-10 flex flex-col items-stretch">
                <div className="flex-grow">
                    {tasks.length > 0 ? (
                        <ul className="mt-3 space-y-2">
                            {tasks.map((task) => (
                                <li key={task.id} className="p-3 bg-gray-100 rounded-md shadow">
                                    {task.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 mt-3">No tasks found.</p>
                    )}
                </div>

                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-pointer"
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>

            </div>



        </div>
    )
}