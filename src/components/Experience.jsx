import { OrbitControls, useGLTF } from "@react-three/drei";
import { CameraAnimation } from "./CameraAnimation";

export const Experience = () => {
  const { scene } = useGLTF("/building.glb");

  return (
    <>
      <CameraAnimation />
      <OrbitControls />
      <ambientLight intensity={2} />
      <directionalLight position={[-10, 10, 10]} intensity={2} />
      <primitive object={scene} />
    </>
  );
};
