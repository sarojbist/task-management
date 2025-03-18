import React, { useEffect, useState } from "react"
import SimpleModal from "../components/addTask"
import authStore from "../stores/authStore";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { FaEdit } from "react-icons/fa";
import UpdateTaskModel from "../components/updateTask";
import DeleteTaskModel from "../components/deleteTask";


export function DashboardPage() {
    const userInfo = authStore((state) => state.userInfo);
    const token = authStore((state) => state.token);

    const [page, setPage] = useState(1);
    const [tasks, setTasks] = useState([]);
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
    useEffect(() => {


        fetchTasks();
    }, [page]);

    return (
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 min-h-screen ">
            <div className="flex justify-between items-center max-w-md py-4 mx-auto">
                <h2 className="text-xl font-semibold text-white">Welcome, {userInfo?.regName}!</h2>
                <SimpleModal />
            </div>
            <h3 className="text-3xl font-semibold text-blue-300 text-center ">Your Tasks</h3>
            <div className="w-full min-h-[80vh] mx-auto mt-6 bg-white rounded-lg shadow-lg p-10 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-6">
                    {tasks.map((task) => (
                        <div key={task.id} className="p-4 bg-gray-100 rounded-md shadow flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                                <p className="text-sm text-gray-600">{task.description}</p>
                                <span className={`text-xs font-medium px-2 py-1 rounded-lg ${task.status === "Completed" ? "bg-green-100 text-green-600"
                                    : task.status === "Pending" ? "bg-yellow-100 text-yellow-600"
                                        : "bg-red-100 text-red-600"
                                    }`}>
                                    {task.status}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <UpdateTaskModel task={task} refresh={fetchTasks} />
                                <DeleteTaskModel task={task} refresh={fetchTasks} />
                            </div>


                        </div>
                    ))}
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