import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
const SelectRest = () => {
    const navigator = useNavigate();
    const navigate = useNavigate();
    const createRest = () => {
        navigator("/setting-up/restaurant/new");
    }


    /**
     * INTERNAL LOGIC starts below:
     */

    const id = localStorage.getItem("UserID");
    const [rest, setRest] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getRest(id);
    }, [id]);

    const getRest = async (id) =>{
        await axios
        .get(`http://localhost:4000/api/getallrestfromone/id=${id}`)
        .then((res) =>{
            const temp = res?.data.rest;
            setRest(temp);
            //console.log(temp);
        })
        .catch((error) =>{
            console.log("Error: ",error);
        }) 
        .finally(() => {
            setisLoading(false);
        }); 
        
    }
    const handleRestClick = async(row) =>{
        localStorage.setItem("RestaurantID",row.info._id);
        localStorage.setItem(
            "infoRestaurant",
            JSON.stringify(row.info)
          );    
        navigate("/manage/home");
        
    }




    /**
     * HTML template;
    */
    return (
        <>
            <div>
                Vui lòng chọn một nhà hàng
            </div>
            <div className='main-content'>
                {
                    isLoading? null : rest.map((row)=>(
                        <div><button onClick={(e)=>handleRestClick(row)} type="button">{row.info.rest_name}</button></div>
                    ))
                }
            </div>
            <div className='footer' onClick={createRest}>
                <FontAwesomeIcon icon={faGear} />
                <> Thêm nhà hàng khác</>
            </div>
        </>
    )
}

export default SelectRest;