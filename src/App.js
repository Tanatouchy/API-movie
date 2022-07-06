import './App.css';
import React,{useState,useEffect} from 'react';

function App() {

  const [endPoint,setEndpoint]= useState("") //สร้าง useState ขึ้น โดย endpoint คือคำที่เราจะค้นหา
  
  const onChangeHandler = (e) =>{ //ตั้งค่าสิ่งที่เราพิมให้แสดงลงบน input โดยใช้ setEndpoint
    setEndpoint(e.target.value)
  }

  const [container,setContainer] = useState([])// เป็นตัวแปรที่ใช้เก็บข้อมูลที่เราดึงมา
  const [finalPoint,setFinalpoint] = useState("") // สร้างขึ้นเพื่อป้องกันการดึงข้อมูลเวลาพิม (โดยจะแสดงผลเมื่อกด Searchเท่านั้น)

  useEffect(()=>{  //ทุกครั้งที่ [endpoint] มีการเปลี่ยนแปลง useEffect จะเรียกใช้งาน fetchMe() เสมอ ทำให้เวลาพิมอะไรใหม่ มันจะแสดงผลทันที
    FetchMe()
  },[finalPoint])

  
  const FetchMe = ()=>{

  const options = { //การประกาศตัวแปรที่ใช้ในการดึง api คล้ายๆรหัสขอเข้าถึงข้อมูล
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f55a49b805mshcf6412361ac8256p1274a9jsn246c7ae986ab',
      'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  };
  
  fetch(`https://online-movie-database.p.rapidapi.com/auto-complete?q=+${endPoint}`, options)
    .then(response => response.json())
    //.then(response => console.log(response))
    .then(data=>{
      setContainer(data.d) //function เก็บ data ที่เป็น json ไว้ใน  useState ที่เป็น[]
    })
    .catch(err => console.error(err));
  }

    
  const submitHandler = e =>{ //function นี้ป้องกันการ refresh ทั้งหน้า webpage หลังจากการกดปุ่ม Search
      e.preventDefault()
      setFinalpoint(endPoint) //ป้องกันการ เรียกข้อมูลทุกครั้งที่พิม
    }

    return (
    <div className="App">
      <h1>Search bar from RapidAPI</h1>
      <form onSubmit={submitHandler}>
        <input type="text" value={endPoint} onChange={onChangeHandler}/>
        <button type='submit'>Search</button>
      </form>
    <div className='element'>
      {container.map((item,index)=>{ //item นี้ คือ data.d ที่เก็บใน setContainer
        return (
          <div key={index} className='element-div'>
            <img src={item.i.imageUrl} alt=""/>
            <p>{item.l}</p>
            <p1>{"Actors: "+item.s}</p1><br/>
            <p2>{"Rank: "+item.rank}</p2>

          </div>
        )
      })}
      </div>
       
    </div>
  );
}

export default App;
