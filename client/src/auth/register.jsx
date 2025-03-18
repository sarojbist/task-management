import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const RegisterSchema = z.object({
  regName: z.string().min(2, "Name must be at least 2 characters"),
  regEmail: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterForm() {
  const registerForm = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const { register, handleSubmit, formState: { errors } } = registerForm;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-80"
      >
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
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
