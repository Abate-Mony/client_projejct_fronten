import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Number, PanigationButton } from '../components';
import AnimateText from '../components/AnimateText'
import { MdOutlineClose } from 'react-icons/md'
import { useravatar } from '../Assets/images';
import Alert from '../components/Alert'
import { setUsers } from '../actions/adminData';
import { Loader, Button, Heading } from '../components';
import { AiOutlinePlus } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { UserData } from '../Assets/userdata';
import { setUserName } from "../actions/userName"
import { Loadingbtn } from "../components";
import InputBox from '../components/InputBox';
import UiButton from '../components/UiButton';
import dateFormater from '../utils/DateFormater';
import { SlOptions } from 'react-icons/sl';
import ShowBuses from './ShowBuses';

const Appointment = ({ skip, currentPage }) => {
    const token = localStorage.getItem("admin_token");
    const data = {}
    const [selected, setSelected] = useState(null)
    const setSelectedNull = () => setSelected(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const setuserName = (username) => {
        dispatch(setUserName(username))

    }
    const password = useRef(null)
    const phone = useRef(null)
    const fullnames = useRef(null)
    const email = useRef(null)
    let [t, setT] = useState(false)
    // var [m,setM]=useState("")

    const handleSubmit = async (e) => {

        e.preventDefault()
        setIsLoading(true)
        const url = "/auth/register"
        try {
            const res = await axios.post(
                url, {
                password: password.current.value,
                phone: phone.current.value,
                fullname: fullnames.current.value,
                email: email.current.value,
            }, {
                headers: {
                    'Authorization': "makingmoney " + token
                }
            }
            )

            setIsOpen(false)
            setT(true)
            fetchData()
            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setIsLoading(false)
            setError(err.response.data);
            const timer = setTimeout(() => {
                clearTimeout(timer)
                setError("")
            }, 5000);

        }

    }

    // 

    const users_ = useSelector(state => state.setAdminData.users);
    const _isLoading = useSelector(state => state.setAdminData.loading.users)
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const setUsers_ = (payload) => {
        return dispatch(setUsers(payload))
    }
    const [text, setText] = useState("")

    async function fetchData() {
        const url = "/admin/userticketlength"

        if (token == null) {
            navigate("/auth?message=please login again ")
        }
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': "makingmoney " + token
                },
                params: {
                    search: text
                }
            })
            setUsers_([...response?.data?.userdetails]);
            setUserData({
                ...{
                    labels: [...response?.data?.userdetails].map((v) => v.fullname),
                    datasets: [
                        {
                            label: "ticket vs user data",
                            data: [...response?.data?.userdetails].map((v) => v.total)

                        },
                    ]

                }

            })
        } catch (err) {
            setUsers_([])
            alert("fail to get users")
            console.log(err)
        }
    }

    useEffect(() => {


        fetchData()



    }, [text])






    const [isOpen, setIsOpen] = useState(false);


    const [userData, setUserData] = useState({
        labels: UserData.map((v) => v.id),
        labels: UserData.map((v) => v.year),
        datasets: [
            {
                label: "users gain",
                data: UserData.map((v) => v.userGain),


            },
            {
                label: "users lost",
                data: UserData.map((v) => v.userLost)

            },
        ]

    })
    return (
        <motion.div

            className="max-w-full !flex-1 w-full   overflow-auto max-h-[calc(100vh-3rem)] pt-10 " >
            <Alert toggle={t} message="Created successfully" setToggle={setT} />
            <ShowBuses
                isOpen={selected ? true : false}
                setIsOpen={setSelectedNull}
            >
                <form className='px-5'>
                    <InputBox
                        name={"Phone"}
                    />
                    <InputBox
                        name={"password"}
                        type={"text"}
                    />
                </form>

            </ShowBuses>
            <div className="flex gap-x-1 items-center">
                <Heading text="Employees OverView" className="!mb-0" /> <h2 className="text-lg text-gray-400">{users_?.length}</h2>
            </div>
            <div className="lg:flex lg:mb-14 w-full  lg:px-10">
                <div className={` flex-1 relative  text-xs mx-0   rounded-lg `}
                >
                    <div className="flex  items-center  mb-10 mt-5 justify-between py-1 rounded-lg shadow
                    bg-white dark:bg-slate-800 mx-4">
                        <div className="flex-1">
                            <Heading text="Add A New Employee" className="!mb-2 !font-black mt-0" />
                            <p className="mb-3 text-sm  px-6">Employees added help to book ticket and give more data</p>
                        </div>
                        <motion.div onClick={() => setIsOpen(c => !c)}
                            initial={{ x: "-50%" }}
                            animate={{ scale: [0.7, 1.2, 0.8], rotate: [0, 360] }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                                repeat: Infinity,
                                repeatDelay: 1
                            }

                            }
                            className="bottom-6 flex-none ml-2 shadow-2xl button-add  top-auto bg-blue-400 
w-[2rem] h-[2rem] rounded-full left-1/2 overflow-hidden 
-translate-x-1/2
z-10  "
                        >
                            <div className="flex h-full w-full items-center scale-animation justify-center ">
                                <AiOutlinePlus size={30} color="#fff" className="" />
                            </div>
                        </motion.div>

                    </div>
                    <LineChart chartData={userData} />
                </div>
                {/* 
*/}

                <div className={`
            ${isOpen ? "visible opacity-100 pointer-events-all " : "invisible opacity-0 pointer-events-none"}
            fixed 
            lg:static
            lg:opacity-100
            lg:visible
            lg:!pointer-events-auto
            transition-[opacity]
            left-1/2
            -translate-x-1/2
            w-[min(calc(100%-2.5rem),25rem)]
            min-h-[10rem]
            bg-white
            dark:bg-slate-800
            dark:shadow-sm
            dark:shadow-dark
            z-20
            rounded-2xl
            top-1/2
            -translate-y-1/2
            lg:translate-x-0
            lg:translate-y-0
            shadow-xl
            shadow-slate-400
            py-5 pb-10`}>
                    <span
                        className='absolute lg:hidden
                    w-8 h-8  hover:ring-red-500
           
            md:h-10 md:w-10 rounded-full
            grid place-items-center
            text-xs
            hover:shadow-xl
            mx-4
            mt-2
            bg-slate-100
            hover:bg-red-400
            ease duration-500
            transition-colors
            right-0 top-0 '
                        onClick={() => setIsOpen(false)}
                    >
                        <MdOutlineClose
                            classNae="text-sm" />
                    </span>
                    <AnimateText text="create new employee" className='!text-lg' />
                    <form
                        onSubmit={handleSubmit}
                        className='px-5'
                    >
                        <InputBox
                            inputRef={fullnames}
                            name={"Full Names"}
                        />
                        <InputBox
                            inputRef={phone}
                            type={"tel"}
                            name={"Phone Number"}
                        />
                        {/* <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={fullnames}
                                type="text"
                                className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="fullname"
                                placeholder="Full Names" required />
                            <label
                                htmlFor="fullname"
                                className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-color_dark
              dark:peer-valid:bg-color_dark
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                            >
                                Full Names
                            </label>
                        </div> */}
                        {/* <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={phone}
                                type="tel"
                                className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="phonenumber"
                                placeholder="Phone number" required />
                            <label
                                htmlFor="phonenumber"
                                // className="
                                // pointer-events-none 
                                // absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                // truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200
                                // ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-color_dark
              dark:peer-valid:bg-color_dark
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                            >
                                Phone Number
                            </label>
                        </div> */}
                        <InputBox
                            inputRef={email}
                            type={"email"}
                            name={"Email Address"}
                        />
                        {/* <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={email}
                                type="email"
                                className="peer block min-h-[auto] w-full 
              rounded 
              border-2
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent
              px-3 py-[0.32rem]
              leading-[2.15] 
              outline-none
              transition-all 
              duration-200
              ease-linear
              focus:placeholder:opacity-100
              data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput3"
                                placeholder="Email address" required />
                            <label
                                htmlFor="exampleFormControlInput3"
                                // className="
                                // pointer-events-none 
                                // absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                // truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200
                                // ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-color_dark
              dark:peer-valid:bg-color_dark
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"

                            >Email address
                            </label>
                        </div> */}
                        <InputBox
                            inputRef={password}
                            type={"password"}
                            name={"Password"}
                        />
                        {/* <div className="relative mb-6" data-te-input-wrapper-init>
                            <input ref={password}
                                type="password"
                                className="
              peer block min-h-[auto] border-2 w-full rounded shadow-none
              focus:border-2
              focus:border-blue-400
              valid:border-blue-400
              bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none
              transition-all duration-200 ease-linear
              focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:placeholder:text-neutral-200
              [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput33"
                                placeholder="Password" required />
                            <label
                                htmlFor="exampleFormControlInput33"
                                className="pointer-events-none 
              absolute left-3
              top-0 mb-0
              max-w-[90%]
              origin-[0_0]
              truncate 
              pt-[0.37rem] 
              leading-[2.15]
              text-neutral-500
              transition-all duration-200  
              ease-out 
              peer-focus:-translate-y-[1.15rem]
              peer-focus:scale-[0.8]
              peer-valid:scale-[0.8]
              peer-valid:text-blue-400
              peer-valid:-translate-y-[1.15rem]
              peer-focus:text-blue-400
              peer-focus:bg-white
              peer-valid:bg-white
              dark:peer-focus:bg-color_dark
              dark:peer-valid:bg-color_dark
              px-0
              bg-transparent
              peer-data-[te-input-state-active]:-translate-y-[1.15rem]
               rounded-sm
               peer-data-[te-input-state-active]:scale-[0.8]
              motion-reduce:transition-none
              dark:text-neutral-200
              dark:peer-focus:text-primary"
                            >Password
                            </label>
                        </div> */}

                        <div className="mb-6 flex items-center justify-between  text-sm font-medium md:text-xl text-orange-600">


                            <motion.h1
                                animate={{
                                    opacity: error ? 1 : 0,
                                    y: error ? 0 : -40,
                                    x: error ? 0 : -1000
                                }}

                                className="w-fit flex-none mx-auto tracking-[0.4rem] text-center ">  {error}</motion.h1>
                        </div>
                        <UiButton
                            type="submit"
                            className={"!text-lg !bg-blue-800 !w-[min(300px,calc(100%-30px))] !mx-auto pb-2 pt-1.5"}
                            disabled={isLoading}
                            name={isLoading ? <Loadingbtn /> : "Create Account"}
                        />


                    </form>
                </div>



            </div>



            <form className="px-4 md:px-6 my-5 max-w-2xl mx-auto"
                onSubmit={handleSubmit}>
                <div className="flex relative min-h-[40px]">
                    <div className="relative w-full">
                        <input type="search" value={text}
                            onChange={e => setText(e.target.value)} id="search-dropdown" className="block outline-none focus:outline-none p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg
                        border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Email address,names etc " required />
                        <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg
                        border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>



            {/* table here */}
            <>

                <div className="relative mt-10 lg:max-w-6xl xl:container  mx-auto overflow-x-auto
bg-white
shadow-md sm:rounded-lg w-full mb-6 ">
                    <table className="w-full text-sm text-left text-gray-500 
dark:text-gray-400 transition-colors duration-[2s]">
                        <thead className="text-xs text-gray-700 dark:bg-slate-800 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    Index
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    CreatedAt
                                </th>

                                <th scope="col" className="px-3 py-3">
                                    N_Prints
                                </th>
                                {/* <th scope="col" className="px-3 py-3">
                                        N_created
                                    </th> */}

                                <th scope="col" className="px-3 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody
                            className="pt-4 pb-12 text-xs md:text-sm"

                        >
                            {
                                users_?.map((user, index) => {
                                    const { fullname, phone, createdAt, _id, total } = user
                                    return (
                                        <tr key={index}
                                            className={` ${index % 2 == 0
                                                ? "bg-slate-100" : "bg-white"}
hover:bg-slate-300
dark:hover:bg-slate-500
border-slate-100  text-xs
border-b-2
dark:bg-gray-900
dark:border-gray-600

`}
                                        >
                                            <th className="px-2 py-4  flex items-center justify-center">
                                                {

                                                    (index + 1) + (skip ?? 2) * ((currentPage ?? 2) - 1)

                                                }
                                            </th>


                                            <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {fullname || "fred morgan rose babell34"}
                                            </th>


                                            <td className="px-3 py-4">
                                                <span className="font-medium
">{phone || "n/a"}</span>
                                            </td>

                                            <td className="px-3 py-2">
                                                {dateFormater(createdAt).date}
                                            </td>


                                            <td className="px-3 py-2">
                                                {total}
                                            </td>

                                            <td className="py-0 text-xs cursor-pointer hover:scale-110 transition-all duration-500 flex items-center justify-center"
                                            >
                                                <SlOptions
                                                    className="hidden"
                                                    onClick={() => setSelected(user)}
                                                    size={20}
                                                />
                                                <Button
                                                    className={"!max-w-[14rem] !w-full"}
                                                    name="Check User"
                                                    href={`/dashboard/details/${_id || index}?admin=true&createdBy=${_id}`}
                                                ></Button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>

                </div>
                <div
                    className="!mb-10 !gap-x-2 px-4 !flex-nowrap !overflow-x-auto flex  md:gap-x-2"
                >
                    {Array.from({
                        length: data?.numberOfPages
                    }, (text, index) => {
                        return <PanigationButton
                            text={index + 1}
                            active={index + 1}
                            // loading={isActiveIndexLoading}
                            index={index}

                            onClick={() => {
                                // setActiveIndex(index)
                                // checkPages(index + 1)
                            }} />
                    })}
                </div>
            </>
            {/* table ends here */}


        </motion.div>
    )

}

export default Appointment