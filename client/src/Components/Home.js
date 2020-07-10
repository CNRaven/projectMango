import React from 'react';
import './Home.css';
import DisplayGroups from './DisplayGroups'
import Activityfeed from './Activityfeed'

const Home = ()=>(
   <React.Fragment>
      <div className='cl left'>
         <div className='box'>
            <h1>Groups</h1>
            <DisplayGroups />
            </div>
            </div>
      <div className='cl middle'>
         <div className='box'>
            <h1>Activity</h1>
            <Activityfeed />
         </div>
         </div>
      <div className='cl right'>
         <div className='box'>
            <h1>Events</h1>
            <div className='groupElement'>Running</div>
            <div className='groupElement'>Cycling</div>
            <div className='groupElement'>Swimming</div>
            <div className='groupElement'>Gym</div>
            {/* <div className='groupElement'>Football</div> */}
            </div>
            </div>
   </React.Fragment>
   
)

export default Home;