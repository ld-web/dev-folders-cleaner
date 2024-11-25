import Loading from "./Loading";

interface Props {
  loading: boolean;
  explore: () => Promise<void>;
}

const ExploreButton = ({ loading, explore }: Props) => (
  <button
    onClick={explore}
    className="relative bg-gradient-to-r from-sky-800 to-sky-700 px-8 py-4 text-white rounded-lg
  hover:translate-y-[-1px] hover:shadow-lg active:translate-y-[1px]
  transition-all duration-200 ease-in-out
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
    disabled={loading}
  >
    {loading ? (
      <span className="flex items-center gap-2">
        <Loading />
        Exploring...
      </span>
    ) : (
      "Explore home directory"
    )}
  </button>
);

export default ExploreButton;
