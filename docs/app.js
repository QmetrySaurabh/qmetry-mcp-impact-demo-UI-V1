// GST calculation logic with:
// - Domestic: 18%
// - Export:
//     baseAmount <= 50,000 => 0%
//     baseAmount  > 50,000 => 12%
// - QTM-4000: Cap GST at 20,000 for any invoice.
function calculateB2BGst(amount, isExport) {
  let gst;

  if (!isExport) {
    // Domestic
    gst = amount * 0.18;
  } else {
    // Export
    if (amount > 50000) {
      // High-value export
      gst = amount * 0.12;
    } else {
      // Baseline export
      gst = 0;
    }
  }

  // QTM-4000: cap GST at 20,000
  if (gst > 20000) {
    gst = 20000;
  }

  return gst;
}

function getInvoiceTotal(baseAmount, isExport) {
  const gst = calculateB2BGst(baseAmount, isExport);
  return {
    gst,
    total: baseAmount + gst
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const baseAmountInput = document.getElementById("baseAmount");
  const invoiceTypeSelect = document.getElementById("invoiceType");
  const resultEl = document.getElementById("result");
  const alertEl = document.getElementById("alert");
  const calculateBtn = document.getElementById("calculateBtn");

  // Small note appended to result when cap is applied
  const CAP_NOTE = " (GST capped at 20,000)";

  calculateBtn.addEventListener("click", () => {
    const base = parseFloat(baseAmountInput.value || "0");
    const isExport = invoiceTypeSelect.value === "export";
    const { gst, total } = getInvoiceTotal(base, isExport);

    let label = isExport ? "B2B Export" : "B2B Domestic";
    let capNote = "";

    // High-value export condition (QTM-2000 / QTM-3000)
    if (isExport && base > 50000) {
      label = "B2B Export (High-Value)";
      // Review banner from QTM-3000
      alertEl.textContent = "High-Value Export – Review Required";
    } else {
      alertEl.textContent = "";
    }

    // Determine if cap was applied (QTM-4000)
    const theoreticalGst = !isExport
      ? base * 0.18
      : (base > 50000 ? base * 0.12 : 0);

    if (theoreticalGst > 20000) {
      capNote = CAP_NOTE;
    }

    resultEl.textContent = `Invoice Total (${label}): ${total.toFixed(2)}${capNote}`;
  });
});
