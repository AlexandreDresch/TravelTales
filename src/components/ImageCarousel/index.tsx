import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ImageCarouselProps {
  children?: React.ReactNode[];
}

export function ImageCarousel({ children: slides }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  function previous() {
    setCurrent((curr) => (curr === 0 ? (slides?.length || 0) - 1 : curr - 1));
  }

  function next() {
    setCurrent((curr) => (curr === (slides?.length || 0) - 1 ? 0 : curr + 1));
  }

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex max-w-lg transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides}
      </div>
      {slides && slides?.length > 1 && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
              onClick={previous}
            >
              <CaretLeft size={30} />
            </button>
            <button
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
              onClick={next}
            >
              <CaretRight size={30} />
            </button>
          </div>

          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {slides &&
                slides.map((_, index) => (
                  <div
                    key={uuidv4()}
                    className={`transition-all w-3 h-3 bg-white rounded-full ${
                      current === index ? "p-2" : "bg-opacity-50"
                    }`}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
