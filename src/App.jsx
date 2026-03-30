import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { DebugPanel } from "./components/DebugPanel";

function App() {
  const [cameraPos, setCameraPos] = useState([3, 3, 3]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(0, 0, 0, 0.7)",
          color: "#fff",
          padding: "15px",
          borderRadius: "5px",
          fontFamily: "monospace",
          fontSize: "12px",
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Debug Panel</div>
        <div>Camera X: {cameraPos[0].toFixed(2)}</div>
        <div>Camera Y: {cameraPos[1].toFixed(2)}</div>
        <div>Camera Z: {cameraPos[2].toFixed(2)}</div>
      </div>
      <Canvas shadows camera={{ position: [0, 0, 0], fov: 70, far: 1000 }}>
        <color attach="background" args={["#ececec"]} />
        <fog attach="fog" args={["#ececec", 100, 600]} />
        <DebugPanel setCameraPos={setCameraPos} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
