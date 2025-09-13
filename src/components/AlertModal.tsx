import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning';
}

const AlertModal: React.FC<AlertModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      default:
        return <Info className="w-6 h-6 text-primary" />;
    }
  };

  const getAccentColor = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50/80';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50/80';
      default:
        return 'border-primary/20 bg-primary/5';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              className={`bg-white rounded-2xl shadow-2xl border-2 ${getAccentColor()} max-w-md w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center space-x-3">
                  {getIcon()}
                  <h2 className="text-xl font-poppins font-semibold text-gray-900">
                    {title}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Content */}
              <div className="px-6 pb-2">
                <p className="text-gray-600 font-open-sans leading-relaxed">
                  {message}
                </p>
              </div>
              
              {/* Footer */}
              <div className="p-6 pt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Got it
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;