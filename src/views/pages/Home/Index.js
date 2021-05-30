import React,{ useState} from 'react';
import { Redirect } from 'react-router-dom';

import CarouselWithImages from '../../components/carousel/CarouselWithImages';

export default function Index() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  if(!user){
    return <Redirect to="/login"/>
  }
  return (
    <div className="listEntities">
      <CarouselWithImages />
    </div>
  );
}
