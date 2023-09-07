import SignUpModel from "./components/SignUpModel";
import LogInModel from "./components/LogInModel";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import { getLoggedinUser } from "./network/users_api";
import { Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";
import styles from "./styles/App.module.css";
import { Container } from "react-bootstrap";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [showLoggedInModal, setShowLoggedInModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getLoggedinUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }

    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLogInClicked={() => {
          setShowLoggedInModal(true);
        }}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
        onLogOutSuccessful={() => {
          setLoggedInUser(null);
        }}
      />
      <Container className={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<NotesPage loggedInUser={loggedInUser} />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>

      {showSignUpModal && (
        <SignUpModel
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSingUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoggedInModal && (
        <LogInModel
          onDismiss={() => {
            setShowLoggedInModal(false);
          }}
          onLogInSuccess={(user) => {
            setLoggedInUser(user);
            setShowLoggedInModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
