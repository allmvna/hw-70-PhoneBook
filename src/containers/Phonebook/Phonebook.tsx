import NewContact from "../NewContact/NewContact.tsx";
import {Route, Routes} from "react-router-dom";
import {Alert} from "@mui/material";
import Layout from "../../UI/Layout/Layout.tsx";
import ContactsList from "../ContactsList/ContactsList.tsx";
import ContactModal from "../../components/ContactModal/ContactModal.tsx";


const Phonebook = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<ContactsList />} />
                    <Route path="/new_contact" element={<NewContact />} />
                    <Route
                        path="*"
                        element={<Alert severity="error">Not found</Alert>}
                    />
                </Routes>
                <ContactModal />
            </Layout>
        </>
    );
};

export default Phonebook;