import { Tabs } from "antd";
import { useSelector } from "react-redux";
import TheatreList from './TheatreList';
import Bookings from './Bookings';

const Profile = () =>{
    
    const{user} = useSelector((state)=>state.user);
    
    const TabItems = [
        {
            key:"1",
            label:"Theater",
            children:<TheatreList/>
        },
        {
            key:"2",
            label:"Bookings",
            children:<Bookings/>
        }
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold">Welcome {user.name} to your Profile</h1>
            <Tabs defaultActiveKey="1" centered items={TabItems}/>
        </div>
    )
}

export default Profile;