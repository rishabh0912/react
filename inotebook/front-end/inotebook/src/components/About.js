import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';

export const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
        <p>{a.state.name}</p>
        <p>{a.state.class}</p>
    </div>
  )
}

export default About;
