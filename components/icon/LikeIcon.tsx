import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { Path, PathProps, SvgProps } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IconProps extends SvgProps {
  // pathFill: string;
  animatedProps?: Partial<Animated.AnimateProps<PathProps>> | undefined;
}
const LikeIcon = (props: IconProps) => (
  <Svg width={18} height={16} fill="none" {...props}>
    <AnimatedPath
      // animatedProps={props.animatedProps}
      d="M15.63 2.458a4.125 4.125 0 0 0-5.835 0L9 3.253l-.795-.795A4.126 4.126 0 0 0 2.37 8.293l.795.795L9 14.923l5.835-5.835.795-.795a4.125 4.125 0 0 0 0-5.835v0Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#212227"
      fill="none"
    />
  </Svg>
);

export default LikeIcon;
