export function getErrorMessage(error) {
  if (error.response?.data?.validationErrors) {
    return Object.values(error.response.data.validationErrors).join(', ');
  }
  return error.response?.data?.message || error.message || 'Something went wrong';
}
