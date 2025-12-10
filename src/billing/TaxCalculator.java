package billing;

public class TaxCalculator {

    // Updated logic:
    // Domestic: 18%
    // Export:
    //   - <= 50,000 => 0%
    //   - > 50,000  => 12%
    public double calculateB2BGst(double amount, boolean isExport) {
        if (!isExport) {
            return amount * 0.18; // Domestic
        }

        // Export logic
        if (amount > 50000) {
            return amount * 0.12; // High-value export
        }

        return 0; // Baseline export
    }
}
