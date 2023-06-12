import { useEffect, useState } from "react";
import { PlayPause } from "@phosphor-icons/react";

export function ImageCarousel() {
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1670351502052-458736107ce1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1685300942028-d0cb0953db8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1638464063189-7c42b8489384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1685305038018-a2c6fd2d9557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1644262783563-16760eb6abbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  ];

  const autoplayInterval = 5000;
  const [autoplay, setAutoplay] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  function toggleAutoplay() {
    setAutoplay((prevAutoplay) => !prevAutoplay);
  }

  function nextSlide() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoplay) {
      intervalId = setInterval(() => {
        nextSlide();
      }, autoplayInterval);
    }

    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  return (
    <div className="max-w-[1200px] h-full w-1/2 m-auto relative group hidden lg:block">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-auto h-[735.5px] rounded-l-lg bg-center bg-cover duration-500"
      ></div>

      <div className="hidden group-hover:block absolute bottom-1 -translate-x-0 translate-y-[-80%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <PlayPause onClick={toggleAutoplay} size={20} />
      </div>
    </div>
  );
}