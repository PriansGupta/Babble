import React from "react";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'
// npm i --save-dev @types/react

const animation = {
  initial: { opacity: 0},
  animate: { opacity: 1},
  exit: { opacity: 0}
};
const SideRoutesAnimation = ({ children }) => {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{duration:1}}
    >
      {children}
    </motion.div>
  );
};

export default SideRoutesAnimation;