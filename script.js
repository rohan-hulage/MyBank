
document.addEventListener('DOMContentLoaded', () => {
    const flipButton = document.querySelector('.flip-button');
    const flipBackButton = document.querySelector('.flip-back-button');
    const card = document.querySelector('.credit-card');
    const viewBalanceButton = document.querySelector('.balance-button');
    const balanceAmount = document.querySelector('.balance-amount')


    flipButton.addEventListener('click', () => {
        card.classList.toggle('flip');
    });

    flipBackButton.addEventListener('click', () => {
        card.classList.toggle('flip');
    });


    // Fetch API

    const URL = "http://localhost:8080/v1/api/account/600568058742";

    const getAccountBalance = async () => {
      
        const response = await fetch(URL, { method: 'GET' });

        const data = await response.json();

        
        viewBalanceButton.addEventListener('click',hideshow,false);

        function hideshow() {
            viewBalanceButton.style.display = 'flex'; 
            this.style.display = 'none';
            
            balanceAmount.innerHTML = data.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, style: 'currency',
            currency: 'INR' });

        } 
    };

    getAccountBalance();


});


