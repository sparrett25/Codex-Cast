import LakeSelect from "../components/LakeSelect";
import ChamberBackground from "../components/ChamberBackground";

export default function Dock() {
  return (
    <ChamberBackground chamber="mirror-lake">
      <div className="mx-auto max-w-5xl px-4 py-8 text-white">
        <h1 className="mb-4 text-3xl font-semibold">Choose Your Lake</h1>
        <LakeSelect />
      </div>
    </ChamberBackground>
  );
}
