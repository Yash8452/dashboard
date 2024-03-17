import React from "react";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
  return (
    <>
      <div className="flex p-4 flex-col space-y-3">
        <Skeleton className="h-[100px] w-[300px] rounded-xl" />
        <Skeleton className="h-[200px] w-[300px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
