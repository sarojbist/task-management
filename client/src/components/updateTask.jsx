import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEdit } from "react-icons/fa";
import { z } from 'zod';
import authStore from '../stores/authStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function UpdateTaskModel({ task, refresh }) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Define the task validation schema
    const taskSchema = z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().optional(),
        status: z.enum(['Pending', 'InProgress', 'Completed']).optional()
    });

    // Setup form handling
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task.title,
            description: task.description,
            status: task.status,
        },
    });

    const token = authStore((state) => state.token);

    const onSubmit = async (formData) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            const response = await axios.put(`${BASE_URL}/tasks/update-task/${task._id}`, formData, config);
            if (response.data.success) {
                alert("Task Updated Successfully!");
                refresh();
                reset(formData); 
                closeModal();
            }
        } catch (err) {
            console.error("Error updating task:", err.message);
            alert("Failed to update task. Try again.", err.message);
        }
    };

    return (
        <>
       
            <div onClick={openModal} className='p-2 cursor-pointer'>
                <FaEdit size={18} />
            </div>

       
            {isOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className='my-2 text-xl font-semibold'>Update Task {task._id}</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    {...register('title')}
                                    className="mt-1 p-2 border rounded-md w-full"
                                    placeholder="Enter task title"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    {...register('description')}
                                    className="mt-1 p-2 border rounded-md w-full"
                                    placeholder="Enter task description (optional)"
                                />
                            </div>

                           
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <select
                                    {...register('status')}
                                    className="mt-1 p-2 border rounded-md w-full"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="InProgress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                         
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-500 cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
