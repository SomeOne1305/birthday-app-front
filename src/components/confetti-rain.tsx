import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
const ConfettiRain = () => {
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti width={width - 30} height={height} gravity={0.04}/>
    </>
  );
};

export default ConfettiRain;
