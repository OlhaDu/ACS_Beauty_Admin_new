export interface FilterPropertiesProps {
    onRatingFilterChange: (
      filter: "positive" | "neutral" | "negative" | undefined
    ) => void;
    onStatusFilterChange: (
      statusFilter: "pending" | "published" | undefined
    ) => void;
  }