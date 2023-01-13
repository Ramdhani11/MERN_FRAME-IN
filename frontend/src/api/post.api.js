import axiosInstance from "../config/axiosInstance"

export const getPosts = async(cb)=>{
  try {
    const result = await axiosInstance.get('/posts')
    return cb(result.data)
  } catch (error) {
    console.log(error)
  }
}