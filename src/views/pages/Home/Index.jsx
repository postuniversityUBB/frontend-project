import React,{ useState} from 'react';
import { Redirect } from 'react-router-dom';

import CarouselWithImages from '../../components/carousel/CarouselWithImages';

const Index = () => {
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

export default Index;
