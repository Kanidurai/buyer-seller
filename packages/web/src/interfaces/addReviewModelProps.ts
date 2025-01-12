interface AddReviewModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (reviewData: { name: string; rating: number; review: string }) => void;
  }
  
  export default AddReviewModalProps;
