/**
 * Alternative Google Sheets submission using JSONP to avoid CORS
 */

export interface JsonpResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp: string;
}

/**
 * Submit form using JSONP to avoid CORS issues
 */
export function submitViaJsonp(data: any, scriptUrl: string): Promise<JsonpResponse> {
  return new Promise((resolve, reject) => {
    // Create callback name
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    
    // Create script element
    const script = document.createElement('script');
    
    // Set up global callback
    (window as any)[callbackName] = function(response: JsonpResponse) {
      // Clean up
      document.head.removeChild(script);
      delete (window as any)[callbackName];
      resolve(response);
    };
    
    // Build URL with parameters
    const params = new URLSearchParams();
    params.append('callback', callbackName);
    
    // Add form data
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (Array.isArray(value)) {
        params.append(key, value.join(','));
      } else {
        params.append(key, value?.toString() || '');
      }
    });
    
    script.src = `${scriptUrl}?${params.toString()}`;
    
    // Handle errors
    script.onerror = () => {
      document.head.removeChild(script);
      delete (window as any)[callbackName];
      reject(new Error('Script loading failed'));
    };
    
    // Add to DOM to trigger request
    document.head.appendChild(script);
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if ((window as any)[callbackName]) {
        document.head.removeChild(script);
        delete (window as any)[callbackName];
        reject(new Error('Request timeout'));
      }
    }, 10000);
  });
}