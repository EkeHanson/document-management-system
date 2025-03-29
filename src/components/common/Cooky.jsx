//rc/components/common/Cookies.jsx
import { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { motion } from "framer-motion";

const Cooky = () => {
  const [accepted, setAccepted] = useState(false);

  if (accepted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="fixed bottom-5 left-5 right-5 md:left-auto md:right-5 bg-white p-4 shadow-lg rounded-lg flex justify-between items-center max-w-lg"
    >
      <p className="text-sm text-gray-700">This website uses cookies to enhance the user experience.</p>
      <Button variant="contained" color="primary" onClick={() => setAccepted(true)} className="ml-4">Accept</Button>
    </motion.div>
  );
};

export default Cooky;
