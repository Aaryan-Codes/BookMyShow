import { Table,message,Button } from "antd";
import { useEffect, useState } from "react";
import { UpdateTheater, getAllTheatersForAdmin } from "../../../apicalls/theaterAPIcall";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/Slices/loaderSlice";

const TheatersTable = () => {

  const dispatch = useDispatch();

  const [theaters, setTheaters] = useState([]);

  const getData = async () => {
    try {
        dispatch(showLoading());
    const response = await getAllTheatersForAdmin();
    // console.log(response);
    if(response.success){
        // console.log(response.data);
        const allTheaters = response.data;
        setTheaters(
            allTheaters.map(function(item){
                return {...item,key:`theater${item._id}`}
            })
        )
    }else{
        message.error(response.message);
    }
    dispatch(hideLoading());     
    } catch (error) {
        console.log(error);
        message.error(error.message);
    } 
  }

  const handleStatusChange = async (theater) =>{
    try {
        dispatch(showLoading());
        let values = {...theater,theaterId:theater._id,isActive: !theater.isActive};
        const response = await UpdateTheater(values);
        if(response.success){
            message.success(response.message);
            getData();
        }
        dispatch(hideLoading());
    } catch (error) {
        console.log(error);
        message.error(error.message);
    }
}

  const columns = [
    {
        title:'Name',
        dataIndex:'name',
        key:'name'
    },
    {
        title:'Address',
        dataIndex:'address',
        key:'address'
    },
    {
        title:'Owner',
        dataIndex:'owner',
        render:(text,data) => {
            return data.owner && data.owner.name;
        }
    },
    {
        title:'Phone Number',
        dataIndex:'phone',
        key:'phone'
    },
    {
        title:'Email',
        dataIndex:'email',
        key:'email'
    },
    {
        title:'Status',
        dataIndex:'status',
        render:(status,data)=>{
            if(data.isActive){
                return 'Approved';
            }else{
                return 'Pending/Blocked';
            }
        }
    },
    {
        title:'Action',
        dataIndex:'action',
        render:(text,data)=>{
            return(
                <div className='d-flex align-items-center gap-10'>
                    {data.isActive ? <Button onClick={()=>handleStatusChange(data)}>
                        Block
                    </Button>:
                    <Button onClick={()=>handleStatusChange(data)}>Approve</Button>
                    }
                </div>
            )
        }
    }
  ]

  useEffect(() => {
    getData();
  }, []);

  return <>{<Table dataSource={theaters} columns={columns}/>}</>;
};

export default TheatersTable;
