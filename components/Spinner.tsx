import { AiOutlineLoading } from "react-icons/ai";

interface PreloaderProps {
  fz?: string;
  h?: string;
  color?: string;
}

const Spinner = ({ fz, h, color = "black" }: PreloaderProps) => {
  return (
    <div
      data-testid="jest"
      className={`flex justify-center items-center h-${h || "30vh"}`}
      style={{ fontSize: fz || "5rem" }}
    >
      <AiOutlineLoading
        className="animation-spin-1s animation-linear"
        style={{ color }}
      />
    </div>
  );
};

export default Spinner;
