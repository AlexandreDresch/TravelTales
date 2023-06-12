import { Upload } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ImageCarousel } from "../../ImageCarousel";
import CountryList from "country-list-with-dial-code-and-flag";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import useCreatePost from "../../../hooks/api/useCreatePost";
import useToken from "../../../hooks/useToken";

const countryData = CountryList.getAll();

export function NewPostForm() {
  const [countries, setCountries] = useState(countryData);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const token = useToken();

  const navigate = useNavigate();

  const { createPostLoading, createPost } = useCreatePost();

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    try {
      await createPost({
        files: previews,
        description,
        country: selectedCountry,
        token,
      });
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  }

  useEffect(() => {
    const convertToBase64 = () => {
      const reader = new FileReader();
      const convertedArray: string[] = [];

      const loadImage = (file: File) => {
        return new Promise<void>((resolve) => {
          reader.onloadend = () => {
            convertedArray.push(reader.result as string);
            resolve();
          };
          reader.readAsDataURL(file);
        });
      };

      const processImages = async () => {
        if (files === null) return;
        for (const file of files) {
          await loadImage(file);
        }
        setPreviews(convertedArray);
      };

      processImages();
    };

    if (files && files.length > 0) {
      convertToBase64();
    }
  }, [files]);

  return (
    <section
      className={`bg-white mt-6 px-2 py-4 flex flex-col md:flex-row ${
        previews.length > 0 && "md:justify-center md:gap-10"
      }`}
    >
      <div className="flex justify-center mb-4 md:mb-0 ">
        <ImageCarousel>
          {previews.map((item) => (
            <img src={item} className="rounded-sm" key={uuidv4()} />
          ))}
        </ImageCarousel>
      </div>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className={`w-full ${
          previews.length > 0 && "md:w-2/3"
        } flex flex-col justify-between`}
      >
        <div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={30} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> your
                  photos
                </p>
              </div>
              <input
                id="file"
                type="file"
                className="hidden"
                accept="image/jpg, image/jpeg, image/png"
                multiple
                max={1}
                disabled={createPostLoading}
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="mb-4">
            <textarea
              className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
              id="description"
              placeholder="A beautiful description..."
              disabled={createPostLoading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              disabled={createPostLoading}
              className="block py-2.5 px-0 w-full text-sm text-center cursor-pointer text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="" hidden>
                --Select a Country--
              </option>
              {countries.map((item) => {
                return (
                  <option key={uuidv4()} value={item.name}>
                    {item.flag} {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="md:ml-2">
            <button
              className={`w-full px-4 py-2 font-bold text-white ${
                createPostLoading
                  ? "bg-cyan-600"
                  : "bg-cyan-400 hover:bg-cyan-500 hover:scale-105"
              } rounded-lg focus:outline-none focus:shadow-outline`}
              type="submit"
              //disabled={signUpLoading}
            >
              {createPostLoading ? (
                <PulseLoader color="white" size={8} />
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
