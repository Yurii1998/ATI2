// Fetch Token Info from BscScan API
const apiKey = 'YOUR_BSCSCAN_API_KEY';
const contractAddress = 'YOUR_TOKEN_CONTRACT_ADDRESS';

// Function to fetch token data
async function fetchTokenData() {
    const url = `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${apiKey}`;
    const urlHolders = `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${contractAddress}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('totalSupply').innerText = data.result;

        const holdersResponse = await fetch(urlHolders);
        const holdersData = await holdersResponse.json();
        document.getElementById('holdersCount').innerText = holdersData.result.length;

    } catch (error) {
        console.error('Error fetching token data:', error);
    }
}

// Timer Countdown to 8 AM Calgary Time
function startCountdown() {
    const calgaryTimeZone = 'America/Edmonton';

    function updateCountdown() {
        const now = new Date();
        const target = new Date();

        target.setHours(8, 0, 0, 0); // Set to 8 AM
        if (now.getHours() >= 8) {
            target.setDate(target.getDate() + 1); // If it's past 8 AM, target next day
        }

        const timeDifference = target - now;

        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerText = `${hours}h ${minutes}m ${seconds}s`;

        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
}

// Saving Benefits Description
document.getElementById('saveBenefits').addEventListener('click', () => {
    const benefits = document.getElementById('benefitsTextarea').value;
    document.getElementById('savedBenefits').innerText = `Saved Benefits: ${benefits}`;
});

// Initialize functions
fetchTokenData();
startCountdown();
