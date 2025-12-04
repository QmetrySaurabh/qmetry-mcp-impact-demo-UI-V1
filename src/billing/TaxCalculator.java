package billing;
public class TaxCalculator {
    public double calculateB2BGst(double amount, boolean isExport) {
        if (isExport) return 0;
        return amount * 0.18;
    }
}