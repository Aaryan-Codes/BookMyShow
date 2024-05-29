import {useSelector} from 'react-redux';
import {Tabs} from 'antd';
import TheatersTable from './TheatersTable';
import MovieList from './MovieList';

const Admin = () =>{

    const {user} = useSelector((state)=>state.user);


    const TabItems = [
        {
            key:"1",
            label:"Movies",
            children:<MovieList/>
        },
        {
            key:"2",
            label:"Theater Requests",
            children:<TheatersTable/>
        }
    ]

    return (
        <div>
            <h1 className="text-2xl font-bold">Welcome {user.name} to Admin Panel</h1>
            <Tabs defaultActiveKey="1" centered items={TabItems}/>
        </div>
    )
}

export default Admin;