import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const RegisterSchema = z.object({
  regName: z.string().min(2, "Name must be at least 2 characters"),
  regEmail: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(RegisterSchema),
  });
  const navigate = useNavigate();
  const onSubmit = async (rawData) => {
    console.log("Form Data:", rawData);
    try {
      const response = await axios.post(`${BASE_URL}/users/register`, rawData);
      console.log(response)
      if (response.data.success) {
       alert("User Registerd");
       navigate("/login")
      }

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <div className="mb-3">
          <label className="block font-medium">Name</label>
          <input
            {...register("regName")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your name"
          />
          {errors.regName && (
            <p className="text-red-500 text-sm mt-1">{errors.regName.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">Email</label>
          <input
            {...register("regEmail")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your email"
          />
          {errors.regEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.regEmail.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium">Password</label>
          <input
            {...register("password")}
            type="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Register
        </button>
        <div className="flex items-center space-x-2">
          <h2 className="text-gray-700">Don't have an account?</h2>
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 cursor-pointer hover:underline focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
