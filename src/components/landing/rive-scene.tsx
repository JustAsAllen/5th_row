"use client";

import { useRive } from "@rive-app/react-canvas";

interface RiveSceneProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  stateMachines?: string;
}

export function RiveScene({ src, className, autoplay = true, stateMachines }: RiveSceneProps) {
  const { RiveComponent } = useRive({
    src,
    autoplay,
    ...(stateMachines ? { stateMachines } : {}),
  });

  // Container must always have explicit dimensions — otherwise the Rive canvas collapses to 0x0.
  return (
    <div className={className ?? "w-full h-full"}>
      <RiveComponent />
    </div>
  );
}