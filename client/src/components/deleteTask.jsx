import axios from 'axios';
import React, { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import authStore from '../stores/authStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function DeleteTaskModel({ task, refresh }) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const token = authStore((state) => state.token);

    const handleDelete = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            await axios.delete(`${BASE_URL}/tasks/delete-task/${task._id}`, config);
            alert("Task Deleted Successfully!");
            refresh();
            closeModal();
        } catch (err) {
            console.error("Error deleting task:", err.message);
            alert("Failed to delete task. Try again.");
        }
    };

    return (
        <>
            <div onClick={openModal} className='p-2 cursor-pointer'>
                <FaTrash size={18} className='text-red-600' />
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className='my-2 text-xl font-semibold'>Are you sure you want to delete this task?</h2>
                        <div className="flex justify-between mt-4">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-500 cursor-pointer"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 cursor-pointer"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
