import React from 'react'
import QuestionPage from './modules/ide/pages/QuestionPage'
import { UserPage } from './modules/user/pages/UserPage'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import "./index.css"
import "./dashboard.css"
import "./AllQuestions.css"
import "./login.css"
import AllQuestionsPage from './modules/allQuestions/pages/AllQuestionsPage'
import { AuthContextProvider } from './shared/context/authContext'
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './modules/user/components/Login'
import { SignUp } from './modules/user/components/SignUp'
import { DetailsProvider } from './shared/context/questionContext'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/allQuestions" />} />
          <Route path="/allQuestions" element={<AllQuestionsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signIn" element={<SignUp />} />
          <Route path="/profile/:id" element={<DashboardPage />} />
          <Route path="/problems/:id" element={
            <DetailsProvider>
              <QuestionPage />
            </DetailsProvider>
          } />
          {/*  */}
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App