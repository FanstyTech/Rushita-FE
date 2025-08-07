


export function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  }
  
  export function calculateBMI(height: number, weight: number): number {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  }
  
  export function getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
      return 'نقص وزن';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'وزن طبيعي';
    } else if (bmi >= 25 && bmi < 30) {
      return 'وزن زائد';
    } else {
      return 'سمنة';
    }
  }
  
  export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  export function validatePhone(phone: string): boolean {
    const phoneRegex = /^(\+966|966|0)?5[0-9]{8}$/;
    return phoneRegex.test(phone);
  }
  
  export function validateNationalId(nationalId: string): boolean {
    return nationalId.length === 10 && /^\d+$/.test(nationalId);
  }