// Debug script for API testing
console.log('=== DEBUG SCRIPT STARTED ===');

// Check if API service exists
if (typeof api === 'undefined') {
    console.error('❌ API service is not defined!');
} else {
    console.log('✅ API service found:', api);
    console.log('✅ API service type:', typeof api);
    console.log('✅ API token:', api.token);
}

// Check localStorage
console.log('=== LOCALSTORAGE CHECK ===');
console.log('authToken:', localStorage.getItem('authToken'));
console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
console.log('user:', localStorage.getItem('user'));

// Test API call if service exists
if (typeof api !== 'undefined') {
    console.log('=== TESTING API CALL ===');
    api.getAllUsers().then(result => {
        console.log('✅ API call successful:', result);
    }).catch(error => {
        console.error('❌ API call failed:', error);
    });
} else {
    console.error('❌ Cannot test API - service not available');
}

console.log('=== DEBUG SCRIPT COMPLETE ===');