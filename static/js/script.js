document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    
    // Handle form submission with loading state
    searchForm.addEventListener('submit', function(e) {
        const city = searchInput.value.trim();
        
        if (!city) {
            e.preventDefault();
            showError('Please enter a city name');
            return;
        }
        
        // Show loading state
        showLoading();
    });
    
    // Handle input focus and enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchForm.submit();
        }
    });
    
    // Clear input when focused (for better UX)
    searchInput.addEventListener('focus', function() {
        this.select();
    });
    
    // Auto-dismiss flash messages after 5 seconds
    const messages = document.querySelectorAll('.message');
    messages.forEach(function(message) {
        setTimeout(function() {
            message.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(function() {
                message.remove();
            }, 500);
        }, 5000);
    });
    
    function showLoading() {
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchButton.disabled = true;
        document.body.classList.add('loading');
    }
    
    function showError(message) {
        // Create and show error message if none exists
        const existingMessages = document.querySelector('.messages');
        if (!existingMessages) {
            const messagesDiv = document.createElement('div');
            messagesDiv.className = 'messages';
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message message-error';
            messageDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i>${message}`;
            
            messagesDiv.appendChild(messageDiv);
            
            const mainContent = document.querySelector('.main-content');
            mainContent.insertBefore(messagesDiv, mainContent.firstChild.nextSibling);
            
            // Auto-dismiss after 5 seconds
            setTimeout(function() {
                messageDiv.style.animation = 'fadeOut 0.5s ease-out forwards';
                setTimeout(function() {
                    messagesDiv.remove();
                }, 500);
            }, 5000);
        }
    }
    
    // Add fade out animation to CSS if not present
    if (!document.querySelector('#fadeOutStyle')) {
        const style = document.createElement('style');
        style.id = 'fadeOutStyle';
        style.textContent = `
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Simple input validation
    searchInput.addEventListener('input', function() {
        const value = this.value.trim();
        if (value.length > 50) {
            this.value = value.substring(0, 50);
        }
        
        // Remove any numbers or special characters except spaces, hyphens, and apostrophes
        this.value = this.value.replace(/[^a-zA-Z\s\-']/g, '');
    });
    
    // Handle offline status
    function updateOnlineStatus() {
        if (!navigator.onLine) {
            showError('You appear to be offline. Please check your internet connection.');
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial check
    updateOnlineStatus();
});
