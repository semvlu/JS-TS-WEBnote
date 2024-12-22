import ListGroup from '../components/ListGroup'
import Alert from '../components/Alert'
import Button from '../components/Button';
import Form from '../components/Form';
import Timer from '../components/Timer';
import Outer from '../components/Nest';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
 
function Home() {
    const [alertVis, setAlertVis] = useState(false);

    const cities = [
      'London',
      'Paris',
      'Tokyo',
      'Amsterdam',
      'Berlin',
      'Rome'
    ];
  
    const handSelItem = (item: string) => {
      console.log(item);
    }

    return (
      <>
        <div>
          <ListGroup items={cities} heading='Metropolitan'
            onSelItem={handSelItem} />
        </div>
  
        <div className='row'>
          <div className='col-md-6'>
            <Button color='danger' onClick={() => setAlertVis(true)} />
          </div>
  
          <div className='col-md-6'>
            {alertVis && <Alert onClose={() => setAlertVis(false)}>
              <b>ALERT</b> MESSAGE
            </Alert>}
          </div>
        </div>
        
        <Timer />
        <Form/>
        <Link to="/aboutus">About Us</Link>
        <Outer />
      </>
    );
}
export default Home;