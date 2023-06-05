import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import { Header } from "../../components/Header";
import { ImageCarousel } from "../../components/Carousel";

import logo from "../../assets/logo.png";

import useSignUp from "../../hooks/api/useSignUp";

import { validateSignUpForm } from "../../utils/helpers";

interface Errors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const { signUpLoading, signUp } = useSignUp();
  const navigate = useNavigate();

  async function handleSignUp(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const errors = validateSignUpForm(
      username,
      email,
      password,
      confirmPassword
    );

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        await signUp({ username, email, password });
        navigate("/sign-in");
      } catch (error) {
        alert("Something went wrong, please try again");
      }
    }
  }

  return (
    <div className="container mx-auto w-screen h-full">
      <Header />
      <div className="flex justify-center h-full px-6 my-12 ">
        <div className="w-full xl:w-3/4 h-full lg:w-11/12 flex justify-center">
          <ImageCarousel />

          <div className="w-full h-full flex flex-col justify-center lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none lg:pt-40">
            <div className="flex w-full justify-center">
              <img src={logo} alt="TravelTales" className="w-12" />
            </div>
            <div className="w-full flex flex-col justify-center">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSignUp}
              >
                <div className="mb-4">
                  <div className="mb-4 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${
                        errors.username && "border-red-500"
                      } rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                      id="username"
                      type="text"
                      placeholder="Username"
                      disabled={signUpLoading}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors && errors.username && (
                      <p className="text-xs italic text-red-500">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${
                      errors.email && "border-red-500"
                    } rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                    id="email"
                    type="email"
                    placeholder="example@example.com"
                    disabled={signUpLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors && errors.email && (
                    <p className="text-xs italic text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${
                        errors.password && "border-red-500"
                      } rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                      id="password"
                      type="password"
                      placeholder="At least 6 characters"
                      disabled={signUpLoading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors && errors.password && (
                      <p className="text-xs italic text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border ${
                        errors.confirmPassword && "border-red-500"
                      } rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
                      id="c_password"
                      type="password"
                      placeholder="Repeat your password"
                      disabled={signUpLoading}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors && errors.confirmPassword && (
                      <p className="text-xs italic text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className={`w-full px-4 py-2 font-bold text-white ${
                      signUpLoading
                        ? "bg-blue-400"
                        : "bg-blue-500 hover:bg-blue-700"
                    } rounded-lg focus:outline-none focus:shadow-outline`}
                    type="submit"
                    disabled={signUpLoading}
                  >
                    {signUpLoading ? (
                      <PulseLoader color="white" size={8} />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center"></div>
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/sign-in"
                  >
                    Already have an account? Log In!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
