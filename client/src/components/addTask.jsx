import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { z } from 'zod';
import authStore from '../stores/authStore';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddModal({refresh}) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const taskSchema = z.object({
        title: z.string().min(1, 'Title is required'),
        description: z.string().optional(),
        status: z.enum(['Pending', 'InProgress', 'Completed']).optional(),
        priority: z.string()
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(taskSchema),
    });

    const token = authStore((state) => state.token);
    // console.log(token);
    const onSubmit = async (rawData) => {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
          console.log("form data", rawData)
          rawData.priority = Number(rawData.priority);
        try {
            const response = await axios.post(`${BASE_URL}/tasks/add-task`, rawData, config);
            if (response.data.success) {
                alert("Task Added");
                refresh()
                reset();
                closeModal();
            }

        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <>
            <button
                onClick={openModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer flex items-center gap-2"
            >
                Add Task <AiOutlinePlus size={20} />
            </button>
            {isOpen && (
                <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
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
                                    <option>Choose a Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="InProgress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select
                                    {...register('priority')}
                                    className="mt-1 p-2 border rounded-md w-full"
                                >
                                    <option>Select Priority</option>
                                    <option value={1}>Highest</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Lowest</option>
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-400 cursor-pointer"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
