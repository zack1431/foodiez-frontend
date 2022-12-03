
import BarChart from "./graphs/bar";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


function DashBoard(props){
    let navigate = useNavigate()
    const BaseUrl = "https://foodiez.onrender.com";
    const [chartData, setChartData] = useState([]);
    let gettotalSales = useCallback(() =>{
        const month = ['jan','feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec']
        axios.get(
            BaseUrl+'/food/totalSales',
            {headers: {
                "authorization" : "bearer "+localStorage.getItem('token')
              }
            }
          )
          .then((response) => {
              if(response.data.status === 200){
                if(response.data.monthArr.length > 0){
                    var tempmonth = []
                    response.data.monthArr.forEach(val =>{
                        tempmonth.push(month[val - 1]) 
                    })
                    var totalSales = response.data.totalArr;
                    var reqObj = [{
                        labels: tempmonth, 
                        datasets: [
                          {
                            label: "Total Sales",
                            data: totalSales,
                            backgroundColor: [
                              "rgba(75,192,192,1)",
                              "#ecf0f1",
                              "#50AF95",
                              "#f3ba2f",
                              "#2a71d0"
                            ],
                            borderColor: "black",
                            borderWidth: 2
                          }
                        ],
                      }]
                    setChartData(reqObj)
                }
              }
              else
              {
                navigate('/login')
              }
            },
            (error) => {
              console.log(error)
            }
          );
    },[navigate])

    useEffect(()=>{
        gettotalSales()
    },[gettotalSales])

    function BarData(){
        if(chartData.length > 0){
            var dataSet = chartData[0];
            return <>
                <BarChart chartData={dataSet} />
            </>
        }
        else
        {
            return 'No Graph Data Available'
        }
    }


	return (
		<div className="p-2">
			<div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <div className="row">
				<div className="col-xl-8 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="">
                                {
                                  <BarData/>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	)
}
export default DashBoard;