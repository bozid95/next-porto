import React from "react";
import { Loader } from "lucide-react";

const LoadingIcon = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-slowSpin w-12 h-12 text-blue-500" />
    </div>
  );
};

export default LoadingIcon;
