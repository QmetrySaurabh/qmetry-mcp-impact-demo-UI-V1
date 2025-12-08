function calculateB2BGst(amount, isExport) {
    if (!isExport) {
      return amount * 0.18; // Domestic
    }
  
    // Export logic:
    // <= 50,000 => 0%
    // > 50,000  => 12%
    if (amount > 50000) {
      return amount * 0.12;
    }
    return 0;
  }
  
  function getInvoiceTotal(baseAmount, isExport) {
    const gst = calculateB2BGst(baseAmount, isExport);
    return baseAmount + gst;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const baseAmountInput = document.getElementById("baseAmount");
    const invoiceTypeSelect = document.getElementById("invoiceType");
    const resultEl = document.getElementById("result");
    const calculateBtn = document.getElementById("calculateBtn");
  
    calculateBtn.addEventListener("click", () => {
      const base = parseFloat(baseAmountInput.value || "0");
      const isExport = invoiceTypeSelect.value === "export";
      const total = getInvoiceTotal(base, isExport);
  
      let label = isExport ? "B2B Export" : "B2B Domestic";
  
      if (isExport && base > 50000) {
        label = "B2B Export (High-Value)";
      }
  
      resultEl.textContent = `Invoice Total (${label}): ${total.toFixed(2)}`;
    });
  });
  