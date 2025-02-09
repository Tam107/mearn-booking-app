import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import List from "./pages/list/List.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* You can add more routes here if needed */}
                <Route path="/hotels" element={<List />} />
                <Route path="/hotels/:id" element={<Hotel />} />
            </Routes>
        </Router>
    );
}

export default App;
