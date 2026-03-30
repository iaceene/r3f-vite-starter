import { useThree, useFrame } from "@react-three/fiber";

export const DebugPanel = ({ setCameraPos }) => {
  const { camera } = useThree();

  useFrame(() => {
    setCameraPos([camera.position.x, camera.position.y, camera.position.z]);
  });

  return null;
};
