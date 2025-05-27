// Location Data (Replace with API integration for production)
const locations = [
    'Warsaw, Poland',
    'Bangkok, Thailand',
    'New York, USA',
    'London, UK',
    'Paris, France',
    'Tokyo, Japan',
    'Sydney, Australia'
];

// Function to generate autocomplete suggestions
function generateSuggestions(input, suggestionsListId) {
    const suggestionsList = document.getElementById(suggestionsListId);
    suggestionsList.innerHTML = '';

    if (input.length < 2) {
        return; // Don't show suggestions for very short inputs
    }

    const filteredLocations = locations.filter(location =>
        location.toLowerCase().startsWith(input.toLowerCase())
    );

    filteredLocations.forEach(location => {
        const li = document.createElement('li');
        li.textContent = location;
        li.addEventListener('click', () => {
            document.getElementById(suggestionsListId.replace('-suggestions', '-location')).value = location;
            suggestionsList.innerHTML = ''; // Clear suggestions after selection
        });
        suggestionsList.appendChild(li);
    });
}

// Add event listeners to location inputs
const fromLocationInput = document.getElementById('from-location');
const toLocationInput = document.getElementById('to-location');

fromLocationInput.addEventListener('input', () => {
    generateSuggestions(fromLocationInput.value, 'from-suggestions');
});

toLocationInput.addEventListener('input', () => {
    generateSuggestions(toLocationInput.value, 'to-suggestions');
});

// Swap Locations Functionality
const swapButton = document.querySelector('.swap-button');
swapButton.addEventListener('click', () => {
    const fromLocation = fromLocationInput.value;
    const toLocation = toLocationInput.value;

    fromLocationInput.value = toLocation;
    toLocationInput.value = fromLocation;

    // Also clear the suggestion lists when swapping
    document.getElementById('from-suggestions').innerHTML = '';
    document.getElementById('to-suggestions').innerHTML = '';
});

// Form Submission Handling (Basic)
document.getElementById('flight-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission

    // Basic validation (expand as needed)
    if (!fromLocationInput.value || !toLocationInput.value) {
        alert('Please enter both From and To locations.');
        return;
    }

    // Collect form data
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());

    // Log the form values (for demonstration purposes)
    console.log('Form submitted with values:', formValues);

    // Redirect to search results page (replace with actual URL)
    window.location.href = '/search-results?from=' + formValues['from-location'] + '&to=' + formValues['to-location'];
});

// Close suggestions on outside click
document.addEventListener('click', (event) => {
    if (!event.target.closest('.form-group')) {
        document.getElementById('from-suggestions').innerHTML = '';
        document.getElementById('to-suggestions').innerHTML = '';
    }
});