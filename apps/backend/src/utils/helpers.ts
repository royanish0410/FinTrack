export const formatDate = (date: Date): string => {
    return new Date(date).toISOString().split('T')[0];
  };
  
  export const getDateRange = (period: 'week' | 'month' | 'year'): { startDate: Date | null; endDate: Date } => {
    const today = new Date();
    let startDate: Date | null = null;
  
    switch (period) {
      case 'week':
        startDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
    }
  
    return { startDate, endDate: new Date() };
  };
  
  export const roundAmount = (amount: number): number => {
    return Math.round(amount * 100) / 100;
  };