/**
 * Get user ID from user object (handles both id and _id)
 */
export const getUserId = (user) => {
  if (!user) return null;
  return user.id || user._id || null;
};

/**
 * Normalize user object to ensure id field exists
 */
export const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    id: user.id || user._id,
  };
};
