import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginSchema = z.object({
  regEmail: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const loginForm = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const { register, handleSubmit, formState: { errors } } = loginForm;



  const onSubmit = async (rawData) => {
    console.log("Login Data:", rawData);
try {
const response = await axios.post(`${BASE_URL}/users/login`, rawData);
console.log(response);

} catch(err) {
  console.log(err.message);
}

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-96 h-80"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

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
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}