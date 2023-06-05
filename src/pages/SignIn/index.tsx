import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import { Header } from "../../components/Header";
import { ImageCarousel } from "../../components/Carousel";

import logo from "../../assets/logo.png";

import UserContext from "../../contexts/UserContext";

import useSignIn from "../../hooks/api/useSignIn";

import { validateSignInForm } from "../../utils/helpers";

interface Errors {
  email?: string;
  password?: string;
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const { signInLoading, signIn } = useSignIn();

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSignIn(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    const errors = validateSignInForm(email, password);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const userData = await signIn({ email, password });
        setUserData(userData);
        navigate("/");
      } catch (err) {
        alert("Unable to log in, please try again");
      }
    }
  }

  return (
    <div className="container mx-auto w-screen h-full">
      <Header />
      <div className="flex justify-center h-full px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
          <ImageCarousel />

          <div className="w-full h-full flex flex-col justify-center lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="flex w-full justify-center">
              <img
                src={logo}
                alt="TravelTales"
                className="w-12"
                aria-label="TravelTales - Home"
              />
            </div>
            <div className="w-full flex flex-col justify-center">
              <h3 className="pt-4 text-2xl text-center">
                Access your Account!
              </h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={handleSignIn}
              >
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
                    disabled={signInLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors && errors.email && (
                    <p className="text-xs italic text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <div className="">
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
                      disabled={signInLoading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors && errors.password && (
                      <p className="text-xs italic text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className={`w-full px-4 py-2 font-bold text-white ${
                      signInLoading
                        ? "bg-blue-400"
                        : "bg-blue-500 hover:bg-blue-700"
                    } rounded-lg focus:outline-none focus:shadow-outline`}
                    type="submit"
                    disabled={signInLoading}
                  >
                    {signInLoading ? (
                      <PulseLoader color="white" size={8} />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center"></div>
                <div className="text-center">
                  <Link
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    to="/sign-up"
                  >
                    Don't have an account? Create right now!
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
