import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';
import { resetGoals, getGoals } from '../features/goals/goalSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    }
    if (user) {
      dispatch(getGoals());
    }

    return () => {
      dispatch(resetGoals());
    };

   
  }, [user, navigate, isError, message, dispatch])

  // useEffect(()=> {
  //   return ()=> dispatch(resetGoals());
  // }, [])

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal}/>
            ))}
          </div>
        ) : (<h3>You have not set any goal</h3>)}
      </section>
    </>
  );
}

export default Dashboard;
