import React,{useEffect,useState} from 'react';
import axios from "../api/axios.js";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from 'react-bootstrap-table-next';



const Icons = () => {
// const baseURL = "http://localhost:3001/v2/Stock/watch";

const baseURL = "https://qiaoyincapital.com/v1/index.php/log/stock";

// https://qiaoyincapital.com/v1/index.php/log/stock


const [stocks,setStocks] = useState([]);

// const [某种数据,设置_某种数据的方法] = useState( 初始值 );

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

useEffect(() => {
  axios.get(baseURL).then((response) => {
    console.log(response);
    setStocks(response.data.stocks);
  });
},[]);

const Stock_olumns = [
{
  dataField: 'id',
  text: 'ID'
},
{
  dataField: 'name',
  text: '股票名称/stockname'
} ,
{
  dataField: 'price',
  text: '股票价格'
}

];


   
   return (
        <div className="content">
          123456, <br />
          
          <BootstrapTable 
             keyField='id' 
             data={stocks} 
             columns={Stock_olumns} 
          />
          
          hello,课程2 内容,
        </div>
   );
}



export default Icons;
