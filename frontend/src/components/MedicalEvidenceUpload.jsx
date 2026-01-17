import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import {
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  CheckCircle as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import MedicalSpinner from './MedicalSpinner';
import { healthcareColors } from '../theme';

const MedicalEvidenceUpload = ({ onFileUpload, uploadedFiles = [] }) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState(uploadedFiles);

  useEffect(() => {
    setFiles(uploadedFiles);
  }, [uploadedFiles]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setUploading(true);
      // Simulate upload processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newFiles = acceptedFiles.map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'verified',
      }));

      setFiles([...files, ...newFiles]);
      setUploading(false);

      if (onFileUpload) {
        onFileUpload([...files, ...newFiles]);
      }
    },
    [files, onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/msword': ['.doc', '.docx'],
    },
  });

  const removeFile = (fileId) => {
    const updatedFiles = files.filter((f) => f.id !== fileId);
    setFiles(updatedFiles);
    if (onFileUpload) {
      onFileUpload(updatedFiles);
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 2, color: 'text.secondary' }}>
        Evidence Documentation
      </Typography>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: `2px dashed ${isDragActive ? healthcareColors.primary : 'rgba(0, 0, 0, 0.2)'}`,
          borderRadius: 3,
          bgcolor: isDragActive ? `${healthcareColors.primary}10` : 'rgba(255, 255, 255, 0.6)',
          cursor: 'pointer',
          transition: 'all 0.3s',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: healthcareColors.primary,
            bgcolor: `${healthcareColors.primary}10`,
          },
        }}
        component={motion.div}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <Box sx={{ py: 2 }}>
            <MedicalSpinner size={50} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Processing evidence...
            </Typography>
          </Box>
        ) : (
          <>
            <UploadIcon sx={{ fontSize: 48, color: healthcareColors.primary, mb: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              {isDragActive ? 'Drop files here' : 'Drag & drop evidence files'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse (PDF, Images, Documents)
            </Typography>
          </>
        )}
      </Paper>

      <AnimatePresence>
        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              Uploaded Evidence:
            </Typography>
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Paper
                  sx={{
                    p: 2,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 2,
                    border: '1px solid rgba(13, 71, 161, 0.2)',
                  }}
                >
                  <FileIcon sx={{ mr: 2, color: healthcareColors.primary }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(file.size / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                  {file.status === 'verified' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <CheckIcon sx={{ color: '#4caf50', mr: 1 }} />
                    </motion.div>
                  )}
                  <IconButton
                    size="small"
                    onClick={() => removeFile(file.id)}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </motion.div>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default MedicalEvidenceUpload;
