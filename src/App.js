import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Student from './components/Student'
function App() {
  return (
       <BrowserRouter>
         <Routes>
           <Route path='/' element={<Student></Student>}></Route>
         </Routes>
       </BrowserRouter>
  );
}

export default App;
