package tests;
import billing.InvoiceService;
public class InvoiceServiceTest {
    public void testDomesticInvoice() {
        InvoiceService service = new InvoiceService();
        double total = service.getInvoiceTotal(1000, false);
        assert total == 1180 : "Domestic GST should be 18%";
    }
    public void testExportInvoice() {
        InvoiceService service = new InvoiceService();
        double total = service.getInvoiceTotal(1000, true);
        assert total == 1000 : "Export GST should be 0%";
    }
}