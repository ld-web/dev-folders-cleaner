import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectSkeleton = () => (
  <div className="p-6 border-[1px] border-gray-400 shadow w-[380px]">
    <div className="flex justify-between items-center mb-3">
      <div className="flex gap-1">
        <Skeleton width={35} />
        <Skeleton width={20} />
        <Skeleton width={27} />
      </div>
      <Skeleton width={45} />
    </div>
    <h3 className="text-xl break-words">
      <Skeleton />
    </h3>
  </div>
);

export default ProjectSkeleton;
