import React from 'react'
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [showEye, setShowEye] = useState(true);
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])
    const copyText = (text) => {
        alert("copied to clipboard : "+text)
        navigator.clipboard.writeText(text);
    }
    const eyeToggle = () => {
        setShowEye(!showEye)
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const savePassword = () => {
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]) // append kar dega :=form ko :
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, {...form, id: uuidv4()}])
            setform({ site: "", username: "", password: "" })
        }
    }
    const deletePassword = (id) => {
        let c = confirm("are you sure you want to delete this password ?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
        }
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id == id)[0])
        setpasswordArray(passwordArray.filter(item => item.id != id))
    }
    return (
        <>
            {/* Same as */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>

            <div className="container  w-[80vw] mx-auto p-5 flex flex-col gap-5">
                <div className="logo font-bold ml-5 text-center text-2xl">
                    <span className='text-green-500'>{'<'}</span>
                    <span className='text-black'>Pass</span>
                    <span className='text-green-500'>OP{'/>'}</span>
                </div>
                <div className='text-center'>
                    Your Own Password Manager
                </div>
                <input value={form.site} onChange={handleChange} name='site' className='w-full bg-white rounded-3xl p-1 px-3' type="text" placeholder='Enter Website URL' />
                <div className='flex justify-center gap-2 relative'>
                    <input value={form.username} onChange={handleChange} name='username' className='bg-white rounded-3xl w-[90%] p-1 px-3' type="text" placeholder='Enter Username' />
                    <div></div>
                    <input value={form.password} onChange={handleChange} name='password' className='bg-white rounded-3xl w-[40%] p-1 px-3' type={showEye ? "password" : "text"} placeholder='Enter Password' />
                    <span className='absolute right-3 top-2 cursor-pointer' onClick={eyeToggle}>
                        {showEye ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button onClick={savePassword} className='cursor-pointer bg-green-500 w-45 rounded-2xl m-auto p-2 px-4 flex items-center gap-2'>
                    <lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="loop"
                        delay="2000">
                    </lord-icon>
                    <div className='text-sm'>Add Password</div>
                </button>
            </div>
            <div className="passwords w-[95vw] text-center m-auto pb-6 lg:w-[80vw]">
                <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                {passwordArray.length === 0 && <div> No passwords to show</div>}
                {passwordArray.length != 0 && <table className="table-auto w-full m-auto rounded-md overflow-hidden mb-10">
                    <thead className='bg-green-800 text-white'>
                        <tr>
                            <th className='py-2'>Site</th>
                            <th className='py-2'>Username</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-green-100'>
                        {passwordArray.map((item, index) => {
                            return <tr key={index}>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <a href={`https://${item.site}`} target="_blank" rel="noopener noreferrer">
                                            {item.site}
                                        </a>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <span>{item.username}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-2 border border-white text-center'>
                                    <div className='flex items-center justify-center '>
                                        <span>{item.password}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div>
                                </td>
                                <td className='justify-center py-2 border border-white text-center'>
                                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                    </span>
                                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                    </span>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>}
            </div>

        </>
    )
}

export default Manager
