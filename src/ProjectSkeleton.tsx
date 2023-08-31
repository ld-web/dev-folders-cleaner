import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectSkeleton = () => (
  <div className="p-6 border-[1px] border-gray-400 shadow w-[380px]">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-xl break-words">
        <Skeleton width={110} />
      </h3>
      <Skeleton width={45} />
    </div>
    <div className="flex gap-1">
      <Skeleton width={35} />
      <Skeleton width={20} />
      <Skeleton width={27} />
    </div>
    <div className="flex justify-end">
      <Skeleton width={20} />
    </div>
  </div>
);

export default ProjectSkeleton;
