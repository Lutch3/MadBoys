import './App.css'
import { FcMadBoys } from './app/FcMadBoys';
import { FcMadBoysProvider} from './components/context/FcMadBoysContext';

function App() {
  return (
    <>
      <FcMadBoysProvider>
        <FcMadBoys/>
      </FcMadBoysProvider>
    </>
  )
}

export default App
