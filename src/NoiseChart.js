import { useObservableState } from "observable-hooks";
import { Main, Logo, Num } from "./ui";
import cx from "classnames";

import { useLastReading } from "./NoiseProvider";

export default function NoiseChart() {
  const lastReading$ = useLastReading();

  const lr = useObservableState(lastReading$, () => ["n/a", "n/a"]);

  return (
    <Main>
      <Logo className="logo" src="logo.png" alt="YoMo" />
      <p>
        实时噪音分贝值：
        <Num className={cx({ glow: lr[0] !== lr[1] })}>{lr[1]}</Num>&nbsp;
      </p>{new Date().valueOf()}
    </Main>
  );
}
