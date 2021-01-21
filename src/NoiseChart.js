import { useObservableState } from "observable-hooks";
import { Main, Logo, Num } from "./ui";
import cx from "classnames";

import { useLastReading } from "./NoiseProvider";

export default function NoiseChart() {
  const lastReading$ = useLastReading();

  const lr = useObservableState(lastReading$, () => ["n/a", "n/a"]);

  if (!lr[0].value) {
    return null;
  }

  return (
    <Main>
      <Logo className="logo" src="logo.png" alt="YoMo" />
      <p>
        实时噪音分贝值：
        <Num className={cx({ glow: lr[0].value.noise !== lr[1].value.noise })}>
          {lr[1].value.noise}
        </Num>
      </p>
      <span>时延: <Num>{lr[1].timestamp - lr[1].value.time}ms</Num></span>
    </Main>
  );
}
