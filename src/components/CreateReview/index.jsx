import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { CREATE_REVIEW } from '../../graphql/mutations';

import ReviewForm from "./ReviewForm";

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { repositoryName, rating, ownerName, text } = values;

      const { data } = await mutate({ variables: {
        review: {
          repositoryName,
          rating: Number(rating),
          ownerName,
          text
        }}
      });

      if (!data || !data.createReview) {
        throw new Error("Failed to create review");
      };

      const repositoryId = data.createReview.repositoryId;
      navigate(`/repository/${repositoryId}`, { replace: true });
    } catch (error) {
      console.log("Error creating review:", error.message);
    };
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;