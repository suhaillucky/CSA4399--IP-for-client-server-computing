// Store user credentials
let registeredUsers = {};

// Register form
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        registeredUsers[username] = password;
        alert('Registration successful!');
        window.location.href = 'login.html';
    });

    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (registeredUsers[loginUsername] && registeredUsers[loginUsername] === loginPassword) {
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password');
        }
    });

    // Vehicle Models
    const cars = [
        { model: 'Car Model 1', price: 2000, spec: '4 Seater, Petrol' },
        { model: 'Car Model 2', price: 2500, spec: '5 Seater, Diesel' },
        { model: 'Car Model 3', price: 3000, spec: 'SUV, 7 Seater' },
        // Add more car models
    ];

    const bikes = [
        { model: 'Bike Model 1', price: 500, spec: '2 Seater, Petrol' },
        { model: 'Bike Model 2', price: 700, spec: '2 Seater, Electric' },
        // Add more bike models
    ];

    function showModels() {
        const vehicleType = document.getElementById('vehicleType').value;
        const modelsDiv = document.getElementById('models');
        modelsDiv.innerHTML = '';

        let models = [];
        if (vehicleType === 'car') {
            models = cars;
        } else if (vehicleType === 'bike') {
            models = bikes;
        }

        models.forEach((model, index) => {
            const modelDiv = document.createElement('div');
            modelDiv.innerHTML = `
                <p><b>${model.model}</b>: ${model.spec} - ₹${model.price}</p>
                <button onclick="selectModel(${index}, '${vehicleType}')">Select</button>
            `;
            modelsDiv.appendChild(modelDiv);
        });
    }

    // Ensure selectModel is available globally
    window.selectModel = function(index, vehicleType) {
        let selectedVehicle = null;
        if (vehicleType === 'car') {
            selectedVehicle = cars[index];
        } else if (vehicleType === 'bike') {
            selectedVehicle = bikes[index];
        }
        if (selectedVehicle) {
            alert(`${selectedVehicle.model} selected`);
            localStorage.setItem('selectedVehicle', JSON.stringify(selectedVehicle)); // Store the selected vehicle
            // Redirect to date and time selection page after vehicle selection
            window.location.href = 'dateandtimeselection.html';
        }
    };

    // Add event listener for vehicle type selection
    document.getElementById('vehicleType')?.addEventListener('change', showModels);
});

// Date and Time Selection
document.getElementById('confirmDateTime')?.addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (startDate && endDate) {
        localStorage.setItem('startDate', startDate);  // Store start date
        localStorage.setItem('endDate', endDate);      // Store end date
        alert('Date and Time confirmed');
        window.location.href = 'payment.html';         // Redirect to payment page
    } else {
        alert('Please select both start and end dates');
    }
});

// Payment Page
let selectedVehicle = JSON.parse(localStorage.getItem('selectedVehicle')); // vehicle object with name and price
let startDate = new Date(localStorage.getItem('startDate'));
let endDate = new Date(localStorage.getItem('endDate'));

// Function to calculate the total days between two dates
function calculateTotalDays(start, end) {
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

// Calculate the total amount and display it
function displayTotalAmount() {
    if (selectedVehicle && startDate && endDate) {
        const totalDays = calculateTotalDays(startDate, endDate);
        const totalAmount = totalDays * selectedVehicle.price;
        document.getElementById('totalAmount').innerText = `Total Amount: ₹${totalAmount} for ${totalDays} day(s)`;
    }
}

// Call the function to display the total amount on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('totalAmount')) {
        displayTotalAmount();  // Ensure the total amount is displayed on the payment page
    }
});
