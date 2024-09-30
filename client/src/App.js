import './css/style.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from './pages/Layout';
import { Index } from './pages/Index';
import { View } from './pages/View';
import { Select } from './pages/Select';
import { Error } from './pages/Error';
import { Edit } from './pages/Edit';
import { Help } from './pages/Help';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="select" element={<Select />} />
          <Route path="view" element={<View />} />
          <Route path="edit" element={<Edit />} />
          <Route path="help" element={<Help />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
