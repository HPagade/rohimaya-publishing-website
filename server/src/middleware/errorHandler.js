/**
 * Global Error Handling Middleware
 * Catches all errors and returns consistent error responses
 */

export const errorHandler = (err, req, res, next) => {
  // Log error
  console.error('❌ Error:', err);

  // Default to 500 server error
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode
    }
  };

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    errorResponse.error.message = 'Validation Error';
    errorResponse.error.details = err.details;
  }

  if (err.name === 'MulterError') {
    errorResponse.error.message = `File upload error: ${err.message}`;
  }

  // OpenAI API errors
  if (err.response?.status === 401) {
    errorResponse.error.message = 'OpenAI API authentication failed';
  }

  if (err.response?.status === 429) {
    errorResponse.error.message = 'Rate limit exceeded. Please try again later.';
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};
