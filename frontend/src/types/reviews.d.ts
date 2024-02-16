interface Review {
  id: number;
  entityId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
}

export default Review;
