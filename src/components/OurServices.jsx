import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
export default function OurServices() {
  const icons = useRef(null)
  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (icons.current) {
        const _icons = [...icons.current.querySelectorAll(".icon")];
        _icons.forEach((item, index) => {
          if (item.getBoundingClientRect().top < (window.innerHeight * 0.8)) {
            if (!item.classList.contains("active")) {
              item.classList.add("active")
            }
          } else {
            item.classList.remove("active")
          }
        })
      }
    })


  }, [])



  return (

    <div className="container mt-24 mb-10 px-6 mx-auto text-lg md:text-xl lg:text-xl" id="#ourservices">
      <section className="mb-20 text-gray-800 dark:text-white text-center icons-container" ref={icons}>
        <h2 className="text-3xl
        md:text-4xl
        lg:text-7xl
        font-montserrat 
        leading-6  
        !font-black
        mb-12
        gradient__text-">Our Services </h2>
        <div className="grid md:grid-cols-3 lg:gap-x-12">
          <div className="mb-12 md:mb-0">
            <motion.div whileHover={{ scale: 1.2, rotate: 90 }}

              whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}

              className="p-4 bg-blue-600 rounded-lg shadow-lg inline-block mb-6 icon">
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z">
                </path>
              </svg>
            </motion.div>
            <motion.h5 drag dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }} className="text-lg md:text-xl font-bold mb-4">Your trip, your priorities</motion.h5>
            <p className="text-gray-500 dark:text-white">
              On a budget? Tight schedule? Book tickets that fit your needs.
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <div className="p-4 bg-blue-600 rounded-lg shadow-lg inline-block mb-6 icon">
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z">
                </path>
              </svg>
            </div>
            <h5 className="text-lg md:text-xl font-bold mb-4">Global coverage</h5>
            <p className="text-gray-500 dark:text-white">
              Save time by comparing all your bus travel options in one place.
            </p>
          </div>

          <div className="mb-12 md:mb-0">
            <div className="p-4 bg-blue-600 rounded-lg shadow-lg inline-block mb-6 icon">
              <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path fill="currentColor"
                  d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z">
                </path>
              </svg>
            </div>
            <h5 className="text-lg md:text-xl font-bold mb-4">24/7 support</h5>
            <p className="text-gray-500 dark:text-white">
              Our world class team of experts is always here to help.
            </p>
          </div>
        </div>
      </section>

    </div>

  )
}

