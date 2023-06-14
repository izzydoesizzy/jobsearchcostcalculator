document.addEventListener('DOMContentLoaded', function() {
    var salaryInput = document.getElementById('salary-input');
    var calculateButton = document.getElementById('calculate-button');
    var resultModal = document.getElementById('result-modal');
    var resultTable = document.getElementById('result-table');

    salaryInput.addEventListener('input', function(e) {
        e.target.value = formatSalary(e.target.value);
    });

    calculateButton.addEventListener('click', function() {
        var annualSalary = parseSalary(salaryInput.value);
        if (annualSalary >= 20000 && annualSalary <= 500000) {
            var results = calculateMissedEarnings(annualSalary);
            displayResults(results);
            resultModal.style.display = 'block';
        } else {
            alert('Please enter a valid salary between $20,000 and $500,000.');
        }
    });

    window.addEventListener('click', function(e) {
        if (e.target == resultModal) {
            resultModal.style.display = 'none';
        }
    });

    function formatSalary(salary) {
        var number = parseInt(salary.replace(/[^0-9]/g, ''));
        return isNaN(number) ? '' : '$' + number.toLocaleString();
    }

    function parseSalary(salary) {
        return parseInt(salary.replace(/[^0-9]/g, ''));
    }

    function calculateMissedEarnings(annualSalary) {
        return [
            { period: '1 Day', earnings: annualSalary / 52 / 5 },
            { period: '1 Week', earnings: annualSalary / 52 },
            { period: '1 Month', earnings: annualSalary / 12 },
            { period: '3 Months', earnings: annualSalary / 4 },
            { period: '6 Months', earnings: annualSalary / 2 }
        ];
    }

    function displayResults(results) {
        resultTable.innerHTML = '';
        for (var i = 0; i < results.length; i++) {
            var row = document.createElement('tr');
            var periodCell = document.createElement('td');
            periodCell.textContent = results[i].period;
            row.appendChild(periodCell);
            var earningsCell = document.createElement('td');
            earningsCell.textContent = '$' + Math.round(results[i].earnings).toLocaleString();
            row.appendChild(earningsCell);
            resultTable.appendChild(row);
        }
    }
});