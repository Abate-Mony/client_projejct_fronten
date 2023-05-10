import { useEffect, useRef } from "react"
import {motion} from 'framer-motion'
const Alert = ({ message, toggle, setToggle }) => {
    const interval = useRef(null)
    useEffect(() => {
        if (toggle) {
            interval.current = setTimeout(() => {
                clearTimeout(interval.current)
                setToggle(false)
            }, 5000);
        }
        // return clearTimeout(interval.current)
    }, [toggle])
    return (

            <motion.div
            initial={{x:"-50%"}}
            animate={{y:toggle?10:-1000}}
            transition={{duration:0.5}}
            class="fixed top-0 select-none left-1/2 -translate-x-[50%] w-[25rem] max-w-[calc(100vw-2.5rem)]   z-[30] overflow-hidden p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className={`absolute ${toggle?"w-full transition-[width] duration-[5s]":"w-0"}    top-0 left-0 h-1  bg-slate-500 rounded-lg`}></div>
            
                <button type="button" class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="successModal" onClick={() => setToggle(false)}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                    <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Success</span>
                </div>
                <p class="mb-6 text-sm font-manrope capitalize font-semibold text-gray-900 dark:text-white">{message || "Successfully applied for service"}</p>
              
            </motion.div>
    )
}

export default Alert