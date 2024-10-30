import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from "axios"

const Dashboard = () => {
    const [balance ,setBalance] = useState('');
    useEffect(() => {
      async function run(){
        const response = await axios.get("http://localhost:3000/api/v1/user/me",{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token"),
          }
        });
        setBalance(response.data.accountDetail.balance);
      }
      run();
    },[])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}

export default Dashboard