import { fetchScreens } from "@/scripts/fetch/fetchScreens";
import { auth } from "@/app/login/auth";
import Screen from "./screen";

export async function Steps({
  orderNumber,
  sku,
}: {
  orderNumber: string;
  sku: string;
}) {
  const user = await auth();
  const screens = await fetchScreens(sku, orderNumber, user?.user?.email || "");
  let steps: Array<any> | null = null;
  let sequence = null;
  if (screens && screens.length === 2) {
    steps = screens[0];
    sequence = screens[1];
  }

  let stepsArray: Array<Array<string>> = [];
  if (steps && typeof steps[0] === "object" && sequence) {
    sequence.forEach((num) => {
      if (steps && steps[0][num.toString()]) {
        stepsArray.push(steps[0][num.toString()]);
      }
    });
    console.log("Steps");
    console.log(steps[0]);
    console.log("Sequence");
    console.log(sequence);
    console.log("Steps Array");
    console.log(stepsArray);
  }

  return stepsArray.map((step, index) => (
    <div key={index} className="p-5 border border-gray-300 m-5 bg-white">
      <h2 className="text-lg font-bold">Screen {index + 1}</h2>
      <Screen param={step} />
    </div>
  ));
}

export default Steps;
