ObjC.import('stdlib');

/** Clears the badge of the FaceTime app by swapping between the first and
 * second tabs. */
export default function () {
  const app = Application('FaceTime');
  app.activate();
  delay(2);
  const se = Application('System Events');
  const ft = se.processes['FaceTime'];
  ft.visible = false;
  const group = ft.windows[0].radioGroups[0];
  for (const x of [1, 0, 1, 0]) {
    try {
      group.radioButtons[x].click();
      delay(0.25);
    } catch (_) {
      app.quit();
      return 1;
    }
  }
  delay(1);
  app.quit();
  return 0;
}
