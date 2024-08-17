document.addEventListener('DOMContentLoaded', () => {
    const accountName = document.querySelector('.account-name');
    const accountNumber = document.querySelector('.account-number');
    const accountType = document.querySelector('.account-type');
    const ifscCode = document.querySelector('.ifsc-code');
    const bankName = document.querySelector('.bank-name');
    const branchName = document.querySelector('.branch-name');
   

    // Account Detials API
    const URL_Account_Details = "http://localhost:8080/v1/api/account/600568058742";
    const getAccountDetails = async () => {
      
        let accountResponse = await fetch(URL_Account_Details, { method: 'GET' });

        let accountData = await accountResponse.json();

        accountName.textContent = accountData.accountHolderName;
        accountNumber.textContent = accountData.accountNumber;
        accountType.textContent = accountData.accountType;
        ifscCode.textContent = accountData.ifscCode;
        bankName.textContent = accountData.bankName;
        branchName.textContent = accountData.branchName;
    };

    getAccountDetails();

    // Transaction Details API

    const URL_Transaction_Details = "http://localhost:8080/v1/api/account/600568058742/transactions";

    let allTransactions = [];

    const getTransactionDetails = async () => {
        try {
            let transactionResponse = await fetch(URL_Transaction_Details, { method: 'GET' });
            let transactionData = await transactionResponse.json();
            allTransactions = transactionData.transactionDetails;
            filterAndDisplayTransactions(15);
        } catch (error) {
            console.error('Error fetching transaction details:', error);
        }
    };

    const filterAndDisplayTransactions = (days) => {
        const now = new Date();
        const filteredTransactions = allTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.transactionDateTime);
            const timeDifference = now - transactionDate;
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            return daysDifference <= days;
        });

        const tableBody = document.querySelector('.transaction-table tbody');
        const templateRow = document.querySelector('.table-row');

        tableBody.innerHTML = '';

        filteredTransactions.forEach(transaction => {
            let newRow = templateRow.cloneNode(true);
            newRow.querySelector('.row-element-one').textContent = transaction.transactionDetails;
            newRow.querySelector('.row-element-two').textContent = transaction.transactionDateTime;
            newRow.querySelector('.row-element-three').textContent = transaction.transactionReferenceNumber;
            newRow.querySelector('.row-element-four').textContent = transaction.transactionAmount;

            tableBody.appendChild(newRow);
        });
    };

    document.getElementById('transaction-filter').addEventListener('change', (event) => {
        const selectedDays = event.target.value;
        filterAndDisplayTransactions(selectedDays);
    });

    getTransactionDetails();

});