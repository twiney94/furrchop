import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React, { FC, useCallback, useState } from "react"
import { useReviewCard } from "../../hooks/useReviewCard";

type ButtonModalProps = {
    bookingId: number;
}

const ButtonModal: FC<ButtonModalProps> = ({bookingId}) =>{

    const { createReviewBooking} = useReviewCard();
    const [comment, setComment] = useState("");
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const [ratingInput, setRatingInput] = useState("");
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingInput(e.target.value);
  };

  const [isCommentError, setIsCommentError] = useState(false);
  const [isRatingError, setIsRatingError] = useState(false);

  // Check only if comment and rating are empty
    const checkCommentError = () => {
    if (comment === "") {
      setIsCommentError(true);
    } else {
      setIsCommentError(false);
    }

    if (ratingInput === "") {
      setIsRatingError(true);
    } else {
      setIsRatingError(false);
    }
    };

    const doReview = useCallback(async () => {
   
        checkCommentError();
        if (!isCommentError && !isRatingError) {
            await createReviewBooking(bookingId, {
                booking: "bookings/" + bookingId.toString(),
                comment: comment,
                rating: parseInt(ratingInput)
            });
            onClose();
        }
    }, [comment, ratingInput, isCommentError, isRatingError]);

    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={onOpen}>Do your review</Button>
        
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your review</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Comment</FormLabel>
                <Input ref={initialRef}
                 placeholder='Comment' 
                 type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    onBlur={checkCommentError}
                    id="comment"
                 />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Rating</FormLabel>
                <Input 
                placeholder='Rating' 
                type="number" 
                value={ratingInput}
                onChange={handleRatingChange}
                onBlur={checkCommentError}
                id="rating"
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button 
              colorScheme='blue' mr={3}
                onClick={doReview}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default ButtonModal