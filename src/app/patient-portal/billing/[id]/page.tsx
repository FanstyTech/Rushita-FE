'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Receipt,
  CreditCard,
  DollarSign,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useInvoice } from '@/lib/api/hooks/useInvoice';
import {
  getInvoiceStatusLabel,
  getInvoiceStatusColor,
  getPaymentMethodLabel,
  getServiceTypeLabel,
} from '@/utils/textUtils';
import { formatDate } from '@/utils/dateTimeUtils';

export default function InvoiceDetailsPage() {
  const params = useParams();
  const invoiceId = params.id as string;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  // Fetch invoice details
  const { useInvoiceDetails } = useInvoice();
  const { data: invoice, isLoading, error } = useInvoiceDetails(invoiceId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-500 mb-2">فشل في تحميل تفاصيل الفاتورة</p>
          <Link href="/patient-portal/billing">
            <Button>العودة للفواتير</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/patient-portal/billing">
              <ArrowLeft className="h-4 w-4 mr-2" />
              العودة للفواتير
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              فاتورة رقم: {invoice.invoiceNumber}
            </h1>
            <p className="text-muted-foreground">تفاصيل الفاتورة والمدفوعات</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                ملخص الفاتورة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاريخ الفاتورة
                  </p>
                  <p className="font-medium">
                    {formatDate(invoice.invoiceDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    تاريخ الاستحقاق
                  </p>
                  <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الحالة</p>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-xs',
                      getInvoiceStatusColor(invoice.status)
                    )}
                  >
                    {getInvoiceStatusLabel(invoice.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">رقم الفاتورة</p>
                  <p className="font-medium">{invoice.invoiceNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                تفاصيل الخدمات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoice.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {item?.serviceType &&
                          getServiceTypeLabel(item.serviceType)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        الكمية: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatCurrency(item.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          {invoice.payments && invoice.payments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  سجل المدفوعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {invoice.payments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-border/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/20">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {formatCurrency(payment.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(payment.paymentDate)} -{' '}
                            {getPaymentMethodLabel(payment.method)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {payment.referenceNumber &&
                            `رقم المرجع: ${payment.referenceNumber}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                الملخص المالي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>المبلغ الإجمالي:</span>
                <span className="font-semibold">
                  {formatCurrency(invoice.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>المدفوع:</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(invoice.paidAmount)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span>المتبقي:</span>
                <span
                  className={cn(
                    'font-semibold text-lg',
                    invoice.totalAmount - invoice.paidAmount > 0
                      ? 'text-red-600'
                      : 'text-green-600'
                  )}
                >
                  {formatCurrency(invoice.totalAmount - invoice.paidAmount)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Patient & Doctor Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                معلومات المريض والطبيب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">المريض</p>
                <p className="font-medium">{invoice.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الطبيب</p>
                <p className="font-medium">{invoice.doctorName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">العيادة</p>
                <p className="font-medium">{invoice.clinicName}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
