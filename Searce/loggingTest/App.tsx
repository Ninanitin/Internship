import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ConsoleLogger } from './utils/logging' ;
import './App.css'
import TestComponent from './components/TestComponent';

function App() {
  const [count, setCount] = useState(0)

  const logger = new ConsoleLogger();

  logger.log('Hello!');
  logger.warn('Careful there!');
  logger.error('Oh, no!');


  return (
    <>
      <TestComponent data="Nina Kamble" />
      

    </>
  )
}

export default App
