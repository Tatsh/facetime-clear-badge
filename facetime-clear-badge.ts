#!/usr/bin/env -S osascript -l JavaScript
// This tool clears the badge of the FaceTime app by swapping between the first
// and second tabs.
interface $ {
  exit(n: number): never;
}

interface Application {
  activate(): void;
  processes: {
    FaceTime: {
      visible: boolean;
      windows: {
        radioGroups: {
          radioButtons: { click: () => void }[];
        }[];
      }[];
    };
  };
  quit(): void;
}

interface ObjC {
  import(x: string): void;
}

declare function delay(n: number): void;
declare var $: $;
declare var Application: (x: string | number) => Application;
declare var ObjC: ObjC;

ObjC.import("stdlib");

/** Clears the badge of the FaceTime app by swapping between the first and
 * second tabs. */
const main = () => {
  const app = Application("FaceTime");
  app.activate();
  delay(2);

  const se = Application("System Events");
  const ft = se.processes["FaceTime"];
  ft.visible = false;
  const group = ft.windows[0].radioGroups[0];

  for (const x of [1, 0, 1, 0]) {
    try {
      group.radioButtons[x].click();
      delay(0.25);
    } catch (e) {
      app.quit();
      return 1;
    }
  }
  delay(1);

  app.quit();
  return 0;
};

$.exit(main());
