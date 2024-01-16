
export const matchesFilter = (rating: number, filter: 'positive' | 'neutral' | 'negative' | undefined) => {
    if (!filter) {
      return true; 
    }
    
    switch (filter) {
      case 'positive':
        return rating > 2;
      case 'neutral':
        return rating === 2;
      case 'negative':
        return rating < 2;
      default:
        return true; 
    }
  };

  export const filterStatus = ( status: string, statusFilter: 'pending' | 'published'  | undefined) => {
    if (!statusFilter) {
      return true; 
    }
    
    switch (statusFilter) {
      case 'pending':
        return status === 'pending';
      case 'published':
        return status === 'published';      
      default:
        return true;
    }
  };

  