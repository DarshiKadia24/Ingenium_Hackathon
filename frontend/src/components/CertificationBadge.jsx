import React, { useState } from 'react';
import { Box, Dialog, DialogContent, Typography, Avatar } from '@mui/material';
import { Verified as VerifiedIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { healthcareColors } from '../theme';

const CertificationBadge = ({ certification, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth="sm"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(227, 242, 253, 0.95) 0%, rgba(187, 222, 251, 0.95) 100%)',
              },
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <DialogContent sx={{ textAlign: 'center', py: 4 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: healthcareColors.primary,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <VerifiedIcon sx={{ fontSize: 60 }} />
                  </Avatar>
                </motion.div>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {certification?.name || 'Certification Verified'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Issued by: {certification?.issuer || 'Healthcare Authority'}
                </Typography>
                {certification?.date && (
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(certification.date).toLocaleDateString()}
                  </Typography>
                )}
                {certification?.expiry && (
                  <Typography variant="body2" color="text.secondary">
                    Expires: {new Date(certification.expiry).toLocaleDateString()}
                  </Typography>
                )}
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificationBadge;
