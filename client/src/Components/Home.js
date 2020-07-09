import React from 'react';
import './Home.css';
import DisplayGroups from './DisplayGroups'
import Activityfeed from './Activityfeed'

const Home = ()=>(
   <React.Fragment>
      <div className='cl left'>
         <div className='box'>
            <h2>Groups</h2>
            <DisplayGroups />
            </div>
            </div>
      <div className='cl middle'>
         <div className='box'>
            <h2>Activity</h2>
            <Activityfeed />
         </div>
         </div>
      <div className='cl right'>
         <div className='box'>
            <h2>Classes</h2>
            </div>
            </div>
   </React.Fragment>
   
)

export default Home;