function calculate() {
    const salesPrice = parseFloat(document.getElementById('salesPrice').value) || 0;
    const cashDP = parseFloat(document.getElementById('cashDP').value) || 0;
    const intRate = parseFloat(document.getElementById('intRate').value) || 0;

    const loanAmount = salesPrice - cashDP;
    const ltv = loanAmount / salesPrice;
    const monthlyRate = intRate / 12;
    const basePI = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -360));
    const year1Rate = intRate - 0.02;
    const year2Rate = intRate - 0.01;
    const year1PI = (loanAmount * (year1Rate / 12)) / (1 - Math.pow(1 + (year1Rate / 12), -360));
    const year2PI = (loanAmount * (year2Rate / 12)) / (1 - Math.pow(1 + (year2Rate / 12), -360));
    const taxes = 781.25;
    const insurance = 133.33;
    const year1 = year1PI + taxes + insurance;
    const year2 = year2PI + taxes + insurance;
    const year3 = basePI + taxes + insurance;
    const subsidy1 = basePI - year1PI;
    const subsidy2 = basePI - year2PI;
    const sellerCost = (subsidy1 * 12) + (subsidy2 * 12);

    document.getElementById('loanAmount').textContent = loanAmount.toFixed(2);
    document.getElementById('ltv').textContent = (ltv * 100).toFixed(1) + '%';
    document.getElementById('year1').textContent = year1.toFixed(2);
    document.getElementById('year2').textContent = year2.toFixed(2);
    document.getElementById('year3').textContent = year3.toFixed(2);
    document.getElementById('sellerCost').textContent = sellerCost.toFixed(2);

    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
}

document.getElementById('next1').addEventListener('click', calculate);
document.getElementById('start-over').addEventListener('click', () => {
    document.getElementById('salesPrice').value = 750000;
    document.getElementById('cashDP').value = 150000;
    document.getElementById('intRate').value = 0.0675;
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
});