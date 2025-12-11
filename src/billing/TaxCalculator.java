package billing;

// GST calculation logic with:
// - Domestic: 18%
// - Export:
//     baseAmount <= 50,000 => 0%
//     baseAmount  > 50,000 => 12%
// - QTM-4000: Cap GST at 20,000 for any invoice.
public class TaxCalculator {

    public double calculateB2BGst(double amount, boolean isExport) {
        double gst;

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

        // QTM-4000: Cap GST at 20,000
        if (gst > 20000) {
            gst = 20000;
        }

        return gst;
    }
}
