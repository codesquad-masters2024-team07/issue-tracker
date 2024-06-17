import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import IssuePage from "./pages/IssuesPage";
import LabelsPage from "./pages/LabelsPage";
import MilestonesPage from "./pages/MilestonesPage";
import NewPage from "./pages/NewPage";
import IssueProduct from "./pages/IssueDetailPage";
import SignUp from "./pages/SignUpPage";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/signUp" element={<SignUp />}/>
                <Route element={<PrivateRoute />}>
                    <Route path="/issue" element={<IssuePage />}/>
                    <Route path="/issue/:productId" element={<IssueProduct />}/>
                    <Route path="/labels" element={<LabelsPage />}/>
                    <Route path="/milestones" element={<MilestonesPage />}/>
                    <Route path="/new" element={<NewPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
