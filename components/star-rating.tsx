import Image from "next/image";

const StarRating = ({ rating }: { rating: number }) => {
  const stars = new Array(rating).fill(0);

  return (
    <>
      {stars.map((_, index) => {
        return (
          <Image
            key={index}
            src="/assets/star.svg"
            width={16}
            height={16}
            alt="star"
          />
        );
      })}
    </>
  );
};

export default StarRating;
