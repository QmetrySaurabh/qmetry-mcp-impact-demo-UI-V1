// GST calculation logic with QTM-2000 high-value export rule:
// - Domestic: 18%
// - Export:
//     baseAmount <= 50,000 => 0%
//     baseAmount  > 50,000 => 12%
function calculateB2BGst(amount, isExport) {
  if (!isExport) {
    // Domestic
    return amount * 0.18;
  }

  // Export
  if (amount > 50000) {
    // High-value export
    return amount * 0.12;
  }

  // Baseline export
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
  const alertEl = document.getElementById("alert");
  const calculateBtn = document.getElementById("calculateBtn");

  calculateBtn.addEventListener("click", () => {
    const base = parseFloat(baseAmountInput.value || "0");
    const isExport = invoiceTypeSelect.value === "export";
    const total = getInvoiceTotal(base, isExport);

    let label = isExport ? "B2B Export" : "B2B Domestic";

    // High-value export condition (QTM-2000)
    if (isExport && base > 50000) {
      label = "B2B Export (High-Value)";
      // QTM-3000: show review banner for high-value export invoices
      alertEl.textContent = "High-Value Export – Review Required";
    } else {
      // Clear banner for all other scenarios
      alertEl.textContent = "";
    }

    resultEl.textContent = `Invoice Total (${label}): ${total.toFixed(2)}`;
  });
});
