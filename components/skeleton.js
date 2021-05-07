import { Skeleton } from "@chakra-ui/react";

export default function SkeletonComponentForPost({ number }) {
  return (
    <>
      {Array(number)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <Skeleton mt="4" width="100%" height="55px" />
          </div>
        ))}
    </>
  );
}
