package billing;
public class InvoiceService {
    private final TaxCalculator taxCalculator = new TaxCalculator();
    public double getInvoiceTotal(double baseAmount, boolean isExport) {
        double gst = taxCalculator.calculateB2BGst(baseAmount, isExport);
        return baseAmount + gst;
    }
}