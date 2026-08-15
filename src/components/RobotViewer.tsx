"use client";

// Docs/11_DESIGN_SYSTEM.md #54-63: interactive Three.js robot as the hero
// centerpiece. #56: subtle interaction (orbit/rotate), not a full playable
// scene. #61: respect prefers-reduced-motion. #63: must degrade gracefully
// if WebGL/Three.js fails to load.
//
// TO USE YOUR OWN MODEL: drop a .glb file at public/models/hero-robot.glb
// (see HERO_MODEL_PATH below to use a different path/filename). That's it —
// no code changes needed. If the file is missing or fails to load, this
// automatically falls back to the placeholder geometric robot instead of
// showing an error, so it's safe to ship without a model and add one later.
import { Component, Suspense, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import type { Group, Mesh } from "three";

const HERO_MODEL_PATH = "/models/hero-robot.glb";

function PlaceholderRobot() {
  const group = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (
      group.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  // §57: robot materials should read as machined metal, not neon plastic.
  return (
    <group ref={group as any}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[0.9, 1.2, 0.9]} />
        <meshStandardMaterial
          color="#1b2530"
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.6, 24]} />
        <meshStandardMaterial color="#151d26" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#d7a84b" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Loads HERO_MODEL_PATH via drei's useGLTF (suspends while fetching, throws
// if the file is missing/invalid -- caught by ModelErrorBoundary below).
// Adjust `scale`/`position` here if your model isn't centered/sized to
// roughly fill a 1-2 unit cube -- most exported .glb files need one or both.
function GLTFRobot() {
  const { scene } = useGLTF(HERO_MODEL_PATH);
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (
      group.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      group.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.0035}
      position={[0, -1.8, 0]}
    />
  );
}

// React Suspense catches the loading state but NOT fetch/parse errors --
// only a class-based error boundary can. Falls back to the placeholder
// (not the full failure panel) since "no custom model yet" is a normal,
// expected state, not a WebGL failure.
class ModelErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? <PlaceholderRobot /> : this.props.children;
  }
}

export function RobotViewer() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <RobotFallback />;
  }

  return (
    <div className="aspect-square w-full max-w-lg">
      <Suspense fallback={<RobotFallback loading />}>
        <Canvas
          // Change position from [2.4, 1.4, 2.4] to a larger distance like [6, 4, 6] or [8, 5, 8]
          camera={{ position: [6, 4, 6], fov: 45 }}
          onError={() => setFailed(true)}
          dpr={[1, 1.75]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 2]} intensity={1.2} />
          <ModelErrorBoundary>
            <Suspense fallback={null}>
              <GLTFRobot />
            </Suspense>
          </ModelErrorBoundary>
          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

function RobotFallback({ loading = false }: { loading?: boolean }) {
  // §63: 3D failure state — a static, still-on-brand panel.
  return (
    <div className="flex aspect-square w-full max-w-lg items-center justify-center rounded-lg border border-border bg-gradient-to-br from-surface to-surface-elevated">
      <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
        {loading ? "Loading model…" : "3D preview unavailable"}
      </span>
    </div>
  );
}
