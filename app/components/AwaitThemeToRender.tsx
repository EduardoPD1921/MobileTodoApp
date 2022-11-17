import React, { useContext } from 'react';
import { Context } from '../context/ThemeContext';
import Home from '../screens/Home';

function AwaitThemeToRender() {
  const ctx = useContext(Context);

  return ctx?.theme ? <Home /> : <></>
}

export default AwaitThemeToRender;