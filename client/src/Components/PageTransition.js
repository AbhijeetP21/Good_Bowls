import React from 'react';
import { motion } from 'framer-motion';

const animations = {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: -10 },
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
