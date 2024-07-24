import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ListAlbum = () => {

  const [data, setData] = useState([]);

  const fetchAlbums = async () => {

    try {
      
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums);
      }

    } catch (error) {
        toast.error("Error occured")
    }
  }

  const removeAlbum = async (id) => {

    try {
      
      const response = await axios.post(`${url}/api/album/remove`, {id})

      if(response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }

    } catch (error) {
      toast.error("Error occured!")
    }

  }

  useEffect(() => {
    fetchAlbums();
  }, [])

  return (
    <div>
      <p className="text-white">All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border  text-sm mr-5 bg-gray-500">
          <b className="text-white">Image</b>
          <b className="text-white">Name</b>
          <b className="text-white">Description</b>
          <b className="text-white">Album Color</b>
          <b className="text-white">Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 text-sm mr-5 border border-gray-300"
            >
              <img className="w-12" src={item.image} alt="" />
              <p className="text-white">{item.name}</p>
              <p className="text-white mr-[15px]">{item.desc}</p>
              <input type='color' value={item.bgColor} className="text-white ml-[15px]" />
              {/* <p className="text-white">X</p> */}
              <div className="flex justify-center mr-[70px]">
                <IconButton aria-label="delete" color="error" onClick={() => removeAlbum(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ListAlbum