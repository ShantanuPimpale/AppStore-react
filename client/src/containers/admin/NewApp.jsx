import React, { useState } from 'react'
import { InputContainer } from '../../components'
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { saveAppDataToCloud } from '../../Api';
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';
import useUser from '../../hooks/users/useUser';

const NewApp = () => {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("")
    const [appIcon, setAppIcon] = useState("")
    const [reviews, setReviews] = useState("")
    const [totalReviews, setTotalReviews] = useState("")
    const [downloads, setDownloads] = useState("")
    const [cover, setCover] = useState("")
    const [banners, setBanners] = useState([]);
    const [shortDescription, setShortDescription] = useState("");

    const { refetch: refetchAllApps } = useUser();

    const BannerChange = (id, value) => {
        const updated = banners.map(item => item.id === id ? { ...item, uri: value } : item);
        setBanners(updated);
    }

    const handleAddInput = () => {
        const newInput = {
            id: banners.length + 1,
            uri: ""
        }
        setBanners(preState => [...preState, newInput
        ]);
        console.log(banners);
    }

    const handleRemoveInput = (id) => {
        const UpdatedBanners = banners.filter(item => item.id !== id)
        setBanners(UpdatedBanners)
    };

    const saveTheDoc = async () => {
        const id = `${Date.now()}`;
        const timestamp = serverTimestamp();
        const _doc = {
            _id: id,
            title,
            company,
            appIcon,
            reviews,
            totalReviews,
            downloads,
            cover,
            banners,
            shortDescription,
            timestamp,
        };
        await saveAppDataToCloud(_doc).then(data => {
            clearAllFields();
            toast.success("Data saved in the cloud");
            refetchAllApps();
        })
    };

    const clearAllFields = () => {
        setTitle("")
        setCompany("")
        setAppIcon("")
        setBanners([])
        setCover("")
        setDownloads("")
        setReviews("")
        setTotalReviews("")
        setShortDescription("")
    }


    return (

        <div className='w-full flex flex-col items-center justify-start px-4 gap-4 py-3'>
            <InputContainer
                placeholder="App title here"
                onChangeText={(data) => setTitle(data)}
                statevalue={title} />
            <InputContainer
                placeholder="Cover Image Url Here"
                onChangeText={(data) => setCover(data)}
                statevalue={cover} />

            <div className='w-full flex flex-col items-center justify-start p-2 border border-gray-600 boder border-dashed rounded-md gap-2'>
                {banners.map(input => (
                    <div className='w-full flex items-center justify-center gap-2' key={input.id}>
                        <input
                            className='w-full h-10 rounded-md outline-none border border-third shadow-md px-4 text-lg font-semibold font-sans bg-secondary'
                            type="text"
                            placeholder={"Banner image url"}
                            value={input.url}
                            onChange={(e) => BannerChange(input.id, e.target.value)}>
                        </input>
                        <div className='w-10 h-10 rounded-md flex items-center justify-center bg-red-400 cursor-pointer' onClick={() => handleRemoveInput(input.id)}> <FaMinus /></div>
                    </div>
                ))}
                <div className='w-full flex items-center justify-center cursor-pointer' onClick={handleAddInput}><FaPlus /></div>
            </div>
            <InputContainer
                placeholder="Company Name Here"
                onChangeText={(data) => setCompany(data)}
                statevalue={company} />
            <InputContainer
                placeholder="App Icon Url Here"
                onChangeText={(data) => setAppIcon(data)}
                statevalue={appIcon} />
            <InputContainer
                placeholder="App Reviews Here"
                onChangeText={(data) => setReviews(data)}
                statevalue={reviews} />
            <InputContainer
                placeholder="Total Reviews Here"
                onChangeText={(data) => setTotalReviews(data)}
                statevalue={totalReviews} />
            <InputContainer
                placeholder="Total Downloads Here"
                onChangeText={(data) => setDownloads(data)}
                statevalue={downloads} />

            <textarea
                name=""
                id=""
                cols="0"
                rows="10"
                className='w-full rounded-md outline-none border border-third shadow-md px-4 text-lg font-semibold font-sans bg-secondary'
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Description here.." />

            <div className='w-full flex items-center justify-end gap-20'>
                <button type='button' className='border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondary cursor-pointer hover:text-black transition-all ease-in-out duration-0 active:scale-95' onClick={saveTheDoc}>Add</button>

                <button type='button' className='border border-gray-600 px-8 py-2 rounded-md hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondary cursor-pointer hover:text-black transition-all ease-in-out duration-0 active:scale-95' onClick={clearAllFields}>Clear</button>

            </div>
        </div>
    )
}

export default NewApp