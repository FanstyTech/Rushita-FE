import React from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { X, Calendar, User, Pill, FileText, Clock } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { ScrollArea } from '@/components/ui/scroll-area';

import { PrescribedMedicationItemDto } from '@/lib/api/types/visit-prescription';
import { formatDate } from '@/utils/dateTimeUtils';

interface PrescriptionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: PrescribedMedicationItemDto | null;
}

export const PrescriptionHistoryModal: React.FC<
  PrescriptionHistoryModalProps
> = ({ isOpen, onClose, prescription }) => {
  // Filter history items for this prescription
  if (!prescription) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Dispensing History
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          {/* Prescription Summary */}
          <Card className="border border-border">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  {prescription.medication.name}
                </h3>
                <Badge
                  color={
                    prescription.remainingQuantity === 0
                      ? 'success'
                      : prescription.remainingQuantity <
                        prescription.quantity / 2
                      ? 'warning'
                      : 'default'
                  }
                >
                  {prescription.remainingQuantity === 0
                    ? 'Fully Dispensed'
                    : `${prescription.remainingQuantity} remaining`}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Patient:</span>
                  <span>{prescription.patientName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Prescribed:</span>
                  <span>{formatDate(prescription?.prescribedDate || '')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Prescription Details:
                </span>
                <span>
                  {prescription.dosage}, {prescription.frequency} for{' '}
                  {prescription.duration}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* <Separator /> */}

          {/* History List */}
          <div className="space-y-2">
            <h3 className="font-medium">Dispensing Records</h3>

            {/* <ScrollArea className="h-[300px] pr-4"> */}
            {/* {historyItems.length > 0 ? ( */}
            <div className="space-y-3">
              {/* {historyItems.map((item) => (
                  <Card key={item.id} className="border border-border">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(item.dispensedDate)}</span>
                        </div>
                        <Badge variant="outline">
                          {item.quantity}{' '}
                          {item.quantity === 1 ? 'unit' : 'units'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Dispensed by:
                        </span>
                        <span>{item.dispensedByName}</span>
                      </div>

                      {item.notes && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Notes:</span>
                          <p className="mt-1 text-sm">{item.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card> 
                {/* ))} */}
            </div>
            {/* ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
                <p className="text-muted-foreground">
                  No dispensing history found for this prescription
                </p>
              </div>
            )} */}
            {/* </ScrollArea> */}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
