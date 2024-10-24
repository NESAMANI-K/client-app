document.getElementById("fetch-price").addEventListener("click", fetchCryptoPrice);

function fetchCryptoPrice() {
    const cryptoName = document.getElementById("crypto-input").value.toLowerCase();
    if (cryptoName === "") {
        alert("Please enter a cryptocurrency name.");
        return;
    }
    
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => {
            displayCryptoPrice(data, cryptoName);
        })
        .catch(error => console.error('Error fetching cryptocurrency data:', error));
}

function displayCryptoPrice(data, cryptoName) {
    const cryptoContainer = document.getElementById('crypto-container');
    cryptoContainer.innerHTML = '';

    if (data[cryptoName]) {
        const price = data[cryptoName].usd;
        const cryptoItem = document.createElement('div');
        cryptoItem.classList.add('crypto-item');
        
        cryptoItem.innerHTML = `
            <h3>${cryptoName.charAt(0).toUpperCase() + cryptoName.slice(1)} Price</h3>
            <p>Current Price: $${price}</p>
        `;
        
        cryptoContainer.appendChild(cryptoItem);
    } else {
        cryptoContainer.innerHTML = `<p>Cryptocurrency not found. Please check the name.</p>`;
    }
}
