import React, { useState } from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';

interface CustomerReviewProps {
  serviceId: string;
}

const CustomerReview: React.FC<CustomerReviewProps> = ({ serviceId }) => {
  const [reviewContent, setReviewContent] = useState('');

  const handleReviewSubmit = () => {
    // Soumettre l'avis au backend en utilisant une fonction d'API appropriée
    console.log(`Review submitted for service ${serviceId}: ${reviewContent}`);
    // Réinitialiser le contenu de l'avis après la soumission
    setReviewContent('');
  };

  return (
    <Flex direction="column" gap={2}>
      <Input
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
        placeholder="Veuillez écrire un avis"
      />
      <Button onClick={handleReviewSubmit}>Submit Review</Button>
    </Flex>
  );
};

export default CustomerReview;
